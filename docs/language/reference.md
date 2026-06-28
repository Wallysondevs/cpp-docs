# Declaração de referência

Declara uma variável nomeada como uma referência, ou seja, um alias para um objeto ou função já existente.

### Sintaxe

Uma declaração de variável de referência é qualquer declaração simples cujo [declarador](<#/doc/language/declarations>) tem a forma

---
`&` attr ﻿(opcional) declarador | (1) |
---|---|---
`& &` attr ﻿(opcional) declarador | (2) | (desde C++11)

1) **Declarador de referência lvalue**: a declaração S& D; declara `D` como uma _referência lvalue_ para o tipo determinado por decl-specifier-seq `S`.

2) **Declarador de referência rvalue**: a declaração S&& D; declara `D` como uma _referência rvalue_ para o tipo determinado por decl-specifier-seq `S`.

- **declarador** — qualquer [declarador](<#/doc/language/declarations>) exceto outro declarador de referência (não existem referências a referências)
- **attr** — (desde C++11) lista de [atributos](<#/doc/language/attributes>)

Uma referência é obrigada a ser inicializada para referir-se a um objeto ou função válido: veja [inicialização de referência](<#/doc/language/reference_initialization>).

O tipo "referência para (possivelmente cv-qualificado) void" não pode ser formado.

Tipos de referência não podem ser [cv-qualificados](<#/doc/language/cv>) no nível superior; não há sintaxe para isso na declaração, e se uma qualificação for adicionada a um typedef-name ou especificador [`decltype`](<#/doc/language/decltype>), (desde C++11) ou [parâmetro de template de tipo](<#/doc/language/template_parameters>), ela é ignorada.

Referências não são objetos; elas não ocupam necessariamente armazenamento, embora o compilador possa alocar armazenamento se for necessário para implementar a semântica desejada (por exemplo, um membro de dados não estático de tipo de referência geralmente aumenta o tamanho da classe pela quantidade necessária para armazenar um endereço de memória).

Como referências não são objetos, não existem arrays de referências, nem ponteiros para referências, nem referências para referências:
```cpp
    int& a[3]; // error
    int&* p;   // error
    int& &r;   // error
```

### Colapso de referência

É permitido formar referências a referências através de manipulações de tipo em templates ou typedefs, caso em que as regras de _colapso de referência_ se aplicam: referência rvalue para referência rvalue colapsa para referência rvalue, todas as outras combinações formam referência lvalue:
```cpp
    typedef int&  lref;
    typedef int&& rref;
    int n;
    
    lref&  r1 = n; // type of r1 is int&
    lref&& r2 = n; // type of r2 is int&
    rref&  r3 = n; // type of r3 is int&
    rref&& r4 = 1; // type of r4 is int&&
```

(Isso, juntamente com regras especiais para [dedução de argumento de template](<#/doc/language/template_argument_deduction>) quando `T&&` é usado em um template de função, forma as regras que tornam [std::forward](<#/doc/utility/forward>) possível.) | (desde C++11)

### Referências lvalue

Referências lvalue podem ser usadas para criar um alias para um objeto existente (opcionalmente com diferente cv-qualificação):

Execute este código
```cpp
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string s = "Ex";
        std::string& r1 = s;
        const std::string& r2 = s;
    
        r1 += "ample";           // modifies s
    //  r2 += "!";               // error: cannot modify through reference to const
        std::cout << r2 << '\n'; // prints s, which now holds "Example"
    }
```

Elas também podem ser usadas para implementar semânticas de passagem por referência em chamadas de função:

Execute este código
```cpp
    #include <iostream>
    #include <string>
    
    void double_string(std::string& s)
    {
        s += s; // 's' is the same object as main()'s 'str'
    }
    
    int main()
    {
        std::string str = "Test";
        double_string(str);
        std::cout << str << '\n';
    }
```

Quando o tipo de retorno de uma função é uma referência lvalue, a expressão de chamada de função torna-se uma expressão [lvalue](<#/doc/language/value_category>):

Execute este código
```cpp
    #include <iostream>
    #include <string>
    
    char& char_number(std::string& s, std::size_t n)
    {
        return s.at(n); // string::at() returns a reference to char
    }
    
    int main()
    {
        std::string str = "Test";
        char_number(str, 1) = 'a'; // the function call is lvalue, can be assigned to
        std::cout << str << '\n';
    }
```

### Referências rvalue

Referências rvalue podem ser usadas para [estender as lifetimes](<#/doc/language/reference_initialization>) de objetos temporários (note que referências lvalue para const também podem estender as lifetimes de objetos temporários, mas não são modificáveis através delas): Execute este código
```cpp
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string s1 = "Test";
    //  std::string&& r1 = s1;           // error: can't bind to lvalue
    
        const std::string& r2 = s1 + s1; // okay: lvalue reference to const extends lifetime
    //  r2 += "Test";                    // error: can't modify through reference to const
    
        std::string&& r3 = s1 + s1;      // okay: rvalue reference extends lifetime
        r3 += "Test";                    // okay: can modify through reference to non-const
        std::cout << r3 << '\n';
    }
```

Mais importante, quando uma função tem sobrecargas de referência rvalue e referência lvalue [overloads](<#/doc/language/overload_resolution>), a sobrecarga de referência rvalue se liga a rvalues (incluindo prvalues e xvalues), enquanto a sobrecarga de referência lvalue se liga a lvalues: Execute este código
```cpp
    #include <iostream>
    #include <utility>
    
    void f(int& x)
    {
        std::cout << "lvalue reference overload f(" << x << ")\n";
    }
    
    void f(const int& x)
    {
        std::cout << "lvalue reference to const overload f(" << x << ")\n";
    }
    
    void f(int&& x)
    {
        std::cout << "rvalue reference overload f(" << x << ")\n";
    }
    
    int main()
    {
        int i = 1;
        const int ci = 2;
    
        f(i);  // calls f(int&)
        f(ci); // calls f(const int&)
        f(3);  // calls f(int&&)
               // would call f(const int&) if f(int&&) overload wasn't provided
        f(std::move(i)); // calls f(int&&)
    
        // rvalue reference variables are lvalues when used in expressions
        int&& x = 1;
        f(x);            // calls f(int& x)
        f(std::move(x)); // calls f(int&& x)
    }
```

Isso permite que [construtores de movimento](<#/doc/language/move_constructor>), operadores de [atribuição de movimento](<#/doc/language/move_operator>) e outras funções cientes de movimento (por exemplo, [std::vector::push_back()](<#/doc/container/vector/push_back>)) sejam selecionados automaticamente quando apropriado. Como as referências rvalue podem se ligar a xvalues, elas podem se referir a objetos não temporários:
```cpp
    int i2 = 42;
    int&& rri = std::move(i2); // binds directly to i2
```

Isso torna possível mover um objeto para fora de um escopo que não é mais necessário:
```cpp
    std::vector<int> v{1, 2, 3, 4, 5};
    std::vector<int> v2(std::move(v)); // binds an rvalue reference to v
    assert(v.empty());
```

### Forwarding references

Forwarding references são um tipo especial de referências que preservam a categoria de valor de um argumento de função, tornando possível _encaminhá-lo_ por meio de [std::forward](<#/doc/utility/forward>). Forwarding references são: 1) parâmetro de função de um template de função declarado como referência rvalue para um [parâmetro de template de tipo](<#/doc/language/template_parameters>) cv-não qualificado desse mesmo template de função:
```cpp
    template<class T>
    int f(T&& x)                      // x is a forwarding reference
    {
        return g(std::forward<T>(x)); // and so can be forwarded
    }
    
    int main()
    {
        int i;
        f(i); // argument is lvalue, calls f<int&>(int&), std::forward<int&>(x) is lvalue
        f(0); // argument is rvalue, calls f<int>(int&&), std::forward<int>(x) is rvalue
    }
    
    template<class T>
    int g(const T&& x); // x is not a forwarding reference: const T is not cv-unqualified
    
    template<class T>
    struct A
    {
        template<class U>
        A(T&& x, U&& y, int* p); // x is not a forwarding reference: T is not a
                                 // type template parameter of the constructor,
                                 // but y is a forwarding reference
    };
```

2) auto&& exceto quando deduzido de uma lista de inicializadores entre chaves ou, quando representa um parâmetro de template de um template de classe durante a [dedução de argumento de template de classe](<#/doc/language/ctad>) (desde C++17):
```cpp
    auto&& vec = foo();       // foo() may be lvalue or rvalue, vec is a forwarding reference
    auto i = std::begin(vec); // works either way
    (*i)++;                   // works either way
    
    g(std::forward<decltype(vec)>(vec)); // forwards, preserving value category
    
    for (auto&& x: f())
    {
        // x is a forwarding reference; this is a common way to use range for in generic code
    }
    
    auto&& z = {1, 2, 3}; // *not* a forwarding reference (special case for initializer lists)
```

Veja também [dedução de argumento de template](<#/doc/language/template_argument_deduction>) e [std::forward](<#/doc/utility/forward>). | (desde C++11)

### Referências pendentes (Dangling references)

Embora as referências sempre se refiram a objetos ou funções válidos após a inicialização, é possível criar um programa onde a [lifetime](<#/doc/language/lifetime>) do objeto referenciado termina, mas a referência permanece acessível (_pendente_).

Dada uma expressão `expr` de tipo de referência e seja `target` o objeto ou função denotado pela referência:

* Se um ponteiro para `target` seria [válido](<#/doc/language/pointer>) no contexto da avaliação de `expr`, o resultado designa `target`.
* Caso contrário, o comportamento é indefinido.

```cpp
    std::string& f()
    {
        std::string s = "Example";
        return s; // exits the scope of s:
                  // its destructor is called and its storage deallocated
    }
    
    std::string& r = f(); // dangling reference
    std::cout << r;       // undefined behavior: reads from a dangling reference
    std::string s = f();  // undefined behavior: copy-initializes from a dangling reference
```

Note que referências rvalue e referências lvalue para const estendem as lifetimes de objetos temporários (veja [Inicialização de referência](<#/doc/language/reference_initialization>) para regras e exceções).

Se o objeto referenciado foi destruído (por exemplo, por chamada explícita de destrutor), mas o armazenamento não foi desalocado, uma referência ao objeto fora da lifetime pode ser usada de maneiras limitadas e pode se tornar válida se o objeto for recriado no mesmo armazenamento (veja [Acesso fora da lifetime](<#/doc/language/lifetime>) para detalhes).

### Referências inacessíveis por tipo

Tentar ligar uma referência a um objeto onde o inicializador convertido é um lvalue (até C++11) um glvalue (desde C++11) através do qual o objeto não é [acessível por tipo](<#/doc/language/reinterpret_cast>) resulta em comportamento indefinido:
```cpp
    char x alignas(int);
    
    int& ir = *reinterpret_cast<int*>(&x); // undefined behavior:
                                           // initializer refers to char object
```

### Referências incompatíveis com chamadas

Tentar ligar uma referência a uma função onde o inicializador convertido é um lvalue (até C++11) um glvalue (desde C++11) cujo tipo não é [compatível com chamadas](<#/doc/language/reinterpret_cast>) com o tipo da definição da função resulta em comportamento indefinido:
```cpp
    void f(int);
    
    using F = void(float);
    F& ir = *reinterpret_cast<F*>(&f); // undefined behavior:
                                       // initializer refers to void(int) function
```

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_rvalue_references`](<#/doc/feature_test>) | [`200610L`](<#/>) | (C++11) | [Referências rvalue](<#/doc/language/reference>)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 453](<https://cplusplus.github.io/CWG/issues/453.html>) | C++98 | não estava claro a qual objeto ou função uma referência não podia ser ligada | esclarecido
[CWG 1510](<https://cplusplus.github.io/CWG/issues/1510.html>) | C++11 | referências cv-qualificadas não podiam ser formadas no operando de decltype | permitido
[CWG 2550](<https://cplusplus.github.io/CWG/issues/2550.html>) | C++98 | parâmetros podiam ter o tipo "referência para void" | não permitido
[CWG 2933](<https://cplusplus.github.io/CWG/issues/2933.html>) | C++98 | o comportamento de acessar referências pendentes era incerto | esclarecido

### Links externos

Thomas Becker, 2013 - [C++ Rvalue References Explained](<http://thbecker.net/articles/rvalue_references/section_01.html>)
---