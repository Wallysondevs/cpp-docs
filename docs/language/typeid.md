# operador typeid

Consulta informações de um tipo.

Usado onde o [tipo dinâmico](<#/doc/language/type-id>) de um [objeto polimórfico](<#/doc/language/objects>) deve ser conhecido e para identificação de tipo estática.

### Sintaxe

---
`typeid (` type `)` | (1) |
---|---|---
`typeid (` expression `)` | (2) |

A expressão typeid é uma [expressão lvalue](<#/doc/language/value_category>) que se refere a um objeto com [duração de armazenamento estática](<#/doc/language/static>), da versão const-qualified do tipo polimórfico [std::type_info](<#/doc/types/type_info>) ou de algum tipo derivado dele.

Se a definição da standard library de [std::type_info](<#/doc/types/type_info>) não estiver visível ao usar typeid, o programa é malformado.

### Explicação

Se type ou o tipo de expression for um tipo de classe ou uma referência a um tipo de classe, então esse tipo de classe não pode ser um [tipo incompleto](<#/doc/language/incomplete_type>).

1) Refere-se a um objeto [std::type_info](<#/doc/types/type_info>) que representa type. Se type for um tipo de referência, o resultado se refere a um objeto [std::type_info](<#/doc/types/type_info>) que representa a versão cv-unqualified do tipo referenciado.

2) Examina expression :

* Se expression for uma expressão [lvalue](<#/doc/language/value_category>)(até C++11) ou [glvalue](<#/doc/language/value_category>)(desde C++11) que identifica um [objeto de um tipo polimórfico](<#/doc/language/objects>) (isto é, uma classe que declara ou herda pelo menos uma [função virtual](<#/doc/language/virtual>)), a expressão typeid avalia a expressão e então se refere ao objeto [std::type_info](<#/doc/types/type_info>) que representa o tipo dinâmico da expressão.

* Se expression for uma [expressão de indireção](<#/doc/language/operator_member_access>) e seu operando avaliar para um [valor de ponteiro nulo](<#/doc/language/pointer>), uma exceção de um tipo que corresponde a handlers do tipo [std::bad_typeid](<#/doc/types/bad_typeid>) é lançada[1](<#/doc/language/typeid>).

* Caso contrário, typeid [não avalia a expressão](<#/doc/language/expressions>), e o objeto [std::type_info](<#/doc/types/type_info>) que ele identifica representa o tipo estático da expressão. Conversões de lvalue-para-rvalue, array-para-ponteiro ou função-para-ponteiro não são realizadas.

* A [materialização temporária](<#/doc/language/implicit_cast>), no entanto, é (formalmente) realizada para argumentos prvalue: o argumento deve ser destrutível no contexto em que a expressão typeid aparece.

| (desde C++17)

Se type ou o tipo de expression for cv-qualified, o resultado do typeid se refere a um objeto [std::type_info](<#/doc/types/type_info>) que representa o tipo cv-unqualified (isto é, typeid(const T) == typeid(T)).

Se typeid for usado em um objeto em construção ou destruição (em um destrutor ou em um construtor, incluindo a [lista de inicializadores](<#/doc/language/initializer_list>) do construtor ou [inicializadores de membro padrão](<#/doc/language/data_members>)), então o objeto [std::type_info](<#/doc/types/type_info>) referido por este typeid representa a classe que está sendo construída ou destruída, mesmo que não seja a classe mais derivada.

1. [↑](<#/doc/language/typeid>) Em outros contextos, avaliar tal expressão resulta em comportamento indefinido.

### Notas

Quando aplicado a uma expressão de tipo polimórfico, a avaliação de uma expressão typeid pode envolver overhead em tempo de execução (uma busca na tabela virtual), caso contrário, a expressão typeid é resolvida em tempo de compilação.

Não é especificado se o destrutor para o objeto referido por typeid é executado no final do programa.

Não há garantia de que o mesmo objeto [std::type_info](<#/doc/types/type_info>) será referido por todas as avaliações da expressão typeid no mesmo tipo, embora eles se comparem como iguais, o [std::type_info::hash_code](<#/doc/types/type_info/hash_code>) desses objetos `type_info` seria idêntico, assim como seu [std::type_index](<#/doc/types/type_index>).
```cpp
    const std::type_info& ti1 = typeid(A);
    const std::type_info& ti2 = typeid(A);
    
    assert(&ti1 == &ti2); // not guaranteed
    assert(ti1 == ti2); // guaranteed
    assert(ti1.hash_code() == ti2.hash_code()); // guaranteed
    assert(std::type_index(ti1) == std::type_index(ti2)); // guaranteed
```

### Palavras-chave

[`typeid`](<#/doc/keyword/typeid>)

### Exemplo

O exemplo mostra a saída usando uma das implementações onde type_info::name retorna nomes de tipo completos; filtre através de c++filt -t se estiver usando gcc ou similar.

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <typeinfo>
    
    struct Base {}; // non-polymorphic
    struct Derived : Base {};
    
    struct Base2 { virtual void foo() {} }; // polymorphic
    struct Derived2 : Base2 {};
    
    int main()
    {
        int myint = 50;
        std::string mystr = "string";
        double *mydoubleptr = nullptr;
    
        std::cout << "myint has type: " << typeid(myint).name() << '\n'
                  << "mystr has type: " << typeid(mystr).name() << '\n'
                  << "mydoubleptr has type: " << typeid(mydoubleptr).name() << '\n';
    
        // std::cout << myint is a glvalue expression of polymorphic type; it is evaluated
        const std::type_info& r1 = typeid(std::cout << myint); // side-effect: prints 50
        std::cout << '\n' << "std::cout<<myint has type : " << r1.name() << '\n';
    
        // std::printf() is not a glvalue expression of polymorphic type; NOT evaluated
        const std::type_info& r2 = typeid(printf("%d\n", myint));
        std::cout << "printf(\"%d\\n\",myint) has type : " << r2.name() << '\n';
    
        // Non-polymorphic lvalue is a static type
        Derived d1;
        Base& b1 = d1;
        std::cout << "reference to non-polymorphic base: " << typeid(b1).name() << '\n';
    
        Derived2 d2;
        Base2& b2 = d2;
        std::cout << "reference to polymorphic base: " << typeid(b2).name() << '\n';
    
        try
        {
            // dereferencing a null pointer: okay for a non-polymorphic expression
            std::cout << "mydoubleptr points to " << typeid(*mydoubleptr).name() << '\n'; 
            // dereferencing a null pointer: not okay for a polymorphic lvalue
            Derived2* bad_ptr = nullptr;
            std::cout << "bad_ptr points to... ";
            std::cout << typeid(*bad_ptr).name() << '\n';
        }
        catch (const std::bad_typeid& e)
        {
            std::cout << " caught " << e.what() << '\n';
        }
    }
```

Saída possível:
```cpp
    ======== output from Clang ========
    myint has type: i
    mystr has type: NSt3__112basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE
    mydoubleptr has type: Pd
    50
    std::cout<<myint has type : NSt3__113basic_ostreamIcNS_11char_traitsIcEEEE
    printf("%d\n",myint) has type : i
    reference to non-polymorphic base: 4Base
    reference to polymorphic base: 8Derived2
    mydoubleptr points to d
    bad_ptr points to...  caught std::bad_typeid
    
    ======== output from MSVC ========
    myint has type: int
    mystr has type: class std::basic_string<char,struct std::char_traits<char>,⮠
    class std::allocator<char> >
    mydoubleptr has type: double * __ptr64
    50
    std::cout<<myint has type : class std::basic_ostream<char,struct std::char_traits<char> >
    printf("%d\n",myint) has type : int
    reference to non-polymorphic base: struct Base
    reference to polymorphic base: struct Derived2
    mydoubleptr points to double
    bad_ptr points to...  caught Attempted a typeid of nullptr pointer!
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[CWG 492](<https://cplusplus.github.io/CWG/issues/492.html>) | C++98 | quando typeid é aplicado a uma referência a um tipo cv-qualified, o resultado representava o tipo referenciado | o resultado representa o tipo referenciado cv-unqualified
[CWG 1416](<https://cplusplus.github.io/CWG/issues/1416.html>) | C++98 | a redação sobre cv-qualification de nível superior poderia ser mal interpretada | melhorou a redação
[CWG 1431](<https://cplusplus.github.io/CWG/issues/1431.html>) | C++98 | typeid só era permitido lançar [std::bad_typeid](<#/doc/types/bad_typeid>) | permitido lançar classes derivadas correspondentes
[CWG 1954](<https://cplusplus.github.io/CWG/issues/1954.html>) | C++98 | não estava claro se a desreferência de ponteiro nulo pode ser verificada em subexpressões de expression | verificada apenas no nível superior

### Veja também

[ type_info](<#/doc/types/type_info>) | contém informações de algum tipo, a classe retornada pelo operador typeid
(classe)