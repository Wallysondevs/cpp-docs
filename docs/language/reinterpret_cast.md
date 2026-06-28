# Conversão reinterpret_cast

Converte entre tipos reinterpretando o padrão de bits subjacente.

### Sintaxe

---
`reinterpret_cast <` target-type `>(` expression `)`
Retorna um valor do tipo target-type.

### Explicação

Ao contrário de static_cast, mas como const_cast, a expressão reinterpret_cast não compila para nenhuma instrução de CPU (exceto ao converter entre inteiros e ponteiros, ou entre ponteiros em arquiteturas obscuras onde a representação do ponteiro depende do seu tipo). É principalmente uma diretiva em tempo de compilação que instrui o compilador a tratar expression como se tivesse o tipo target-type.

Apenas as seguintes conversões podem ser feitas com reinterpret_cast, exceto quando tais conversões [removeriam a constness](<#/doc/language/const_cast>) (ou volatilidade).

1) Uma expressão de tipo integral, enumeração, ponteiro ou ponteiro para membro pode ser convertida para seu próprio tipo. O valor resultante é o mesmo que o valor de expression.

2) Um ponteiro pode ser convertido para qualquer tipo integral grande o suficiente para armazenar todos os valores de seu tipo (por exemplo, para [std::uintptr_t](<#/doc/types/integer>)).

3) Um valor de qualquer tipo integral ou de enumeração pode ser convertido para um tipo de ponteiro. Um ponteiro convertido para um inteiro de tamanho suficiente e de volta para o mesmo tipo de ponteiro tem garantia de ter seu valor original, caso contrário, o ponteiro resultante não pode ser desreferenciado com segurança (a conversão de ida e volta na direção oposta não é garantida; o mesmo ponteiro pode ter múltiplas representações inteiras). A constante de ponteiro nulo [NULL](<#/doc/types/NULL>) ou o inteiro zero não tem garantia de produzir o valor de ponteiro nulo do tipo de destino; [`static_cast`](<#/doc/language/static_cast>) ou [conversão implícita](<#/doc/language/implicit_cast>) devem ser usados para este propósito.

4) Qualquer valor do tipo [std::nullptr_t](<#/doc/types/nullptr_t>), incluindo nullptr, pode ser convertido para qualquer tipo integral como se fosse (void*)0, mas nenhum valor, nem mesmo nullptr, pode ser convertido para [std::nullptr_t](<#/doc/types/nullptr_t>): static_cast deve ser usado para esse propósito. | (desde C++11)

5) Qualquer tipo de ponteiro para objeto `T1*` pode ser convertido para outro tipo de ponteiro para objeto `_cv_ T2*`. Isso é exatamente equivalente a static_cast<_cv_ T2*>(static_cast<_cv_ void*>(expression)) (o que implica que, se o requisito de alinhamento de `T2` não for mais rigoroso que o de `T1`, o valor do ponteiro não muda e a conversão do ponteiro resultante de volta ao seu tipo original produz o valor original). Em qualquer caso, o ponteiro resultante só pode ser desreferenciado com segurança se o valor desreferenciado for [acessível por tipo](<#/doc/language/reinterpret_cast>).

6) Uma expressão [lvalue](<#/doc/language/value_category>)(ate C++11)[glvalue](<#/doc/language/value_category>)(desde C++11) do tipo `T1` pode ser convertida para uma referência a outro tipo `T2`. O resultado é o de *reinterpret_cast<T2*>(p), onde p é um ponteiro do tipo “ponteiro para `T1`” para o objeto ou função designada por expression. Nenhum temporário é materializado ou(desde C++17) criado, nenhuma cópia é feita, nenhum construtor ou função de conversão é chamado. A referência resultante só pode ser acessada com segurança se for [acessível por tipo](<#/doc/language/reinterpret_cast>).

7) Qualquer ponteiro para função pode ser convertido para um ponteiro para um tipo de função diferente. O resultado é não especificado, mas converter tal ponteiro de volta para o ponteiro para o tipo de função original produz o ponteiro para a função original. O ponteiro resultante só pode ser chamado com segurança se o seu tipo de função for [compatível com chamada](<#/doc/language/reinterpret_cast>) com o tipo de função original.

8) Em algumas implementações (em particular, em qualquer sistema compatível com POSIX, conforme exigido por [`dlsym`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/dlsym.html>)), um ponteiro para função pode ser convertido para void* ou qualquer outro ponteiro para objeto, ou vice-versa. Se a implementação suportar a conversão em ambas as direções, a conversão para o tipo original produz o valor original, caso contrário, o ponteiro resultante não pode ser desreferenciado ou chamado com segurança.

9) O valor de ponteiro nulo de qualquer tipo de ponteiro pode ser convertido para qualquer outro tipo de ponteiro, resultando no valor de ponteiro nulo desse tipo. Note que a constante de ponteiro nulo nullptr ou qualquer outro valor do tipo [std::nullptr_t](<#/doc/types/nullptr_t>) não pode ser convertido para um ponteiro com reinterpret_cast: conversão implícita ou static_cast devem ser usados para este propósito.

10) Um ponteiro para função membro pode ser convertido para um ponteiro para uma função membro diferente de um tipo diferente. A conversão de volta para o tipo original produz o valor original, caso contrário, o ponteiro resultante não pode ser usado com segurança.

11) Um ponteiro para objeto membro de alguma classe `T1` pode ser convertido para um ponteiro para outro objeto membro de outra classe `T2`. Se o alinhamento de `T2` não for mais rigoroso que o de `T1`, a conversão de volta para o tipo original `T1` produz o valor original, caso contrário, o ponteiro resultante não pode ser usado com segurança.

Assim como em todas as expressões de cast, o resultado é:

*   um lvalue se target-type for um tipo de referência lvalue ou uma referência rvalue para tipo de função(desde C++11);

*   um xvalue se target-type for um tipo de referência rvalue para objeto;

| (desde C++11)

*   um prvalue caso contrário.

### Aliasing de Tipo

#### Acessibilidade de Tipo

Se um tipo `T_ref` for [similar](<#/doc/language/implicit_cast>) a qualquer um dos seguintes tipos, um objeto de [tipo dinâmico](<#/doc/language/type-id>) `T_obj` é _acessível por tipo_ através de um lvalue(ate C++11)glvalue(desde C++11) do tipo `T_ref`:

*   char
*   unsigned char

*   std::byte

| (desde C++17)

*   `T_obj`
*   o tipo com sinal ou sem sinal correspondente a `T_obj`

Se um programa tentar ler ou modificar o valor armazenado de um objeto através de um lvalue(ate C++11)glvalue(desde C++11) através do qual ele não é acessível por tipo, o comportamento é indefinido.

Esta regra permite a análise de alias baseada em tipo, na qual um compilador assume que o valor lido através de um glvalue de um tipo não é modificado por uma escrita em um glvalue de um tipo diferente (sujeito às exceções mencionadas acima).

Note que muitos compiladores C++ relaxam esta regra, como uma extensão de linguagem não padrão, para permitir acesso de tipo incorreto através do membro inativo de uma [union](<#/doc/language/union>) (tal acesso não é indefinido em C).

#### Compatibilidade de Chamada

Se qualquer uma das seguintes condições for satisfeita, um tipo `T_call` é _compatível com chamada_ com um tipo de função `T_func`:

*   `T_call` é o mesmo tipo que `T_func`.

*   `T_func*` pode ser convertido para `T_call*` via uma [conversão de ponteiro para função](<#/doc/language/implicit_cast>).

| (desde C++17)

Se uma função for chamada através de uma expressão cujo [tipo de função](<#/doc/language/function>) não é compatível com chamada com o tipo da definição da função chamada, o comportamento é indefinido.

### Notas

Assumindo que os requisitos de alinhamento são atendidos, um reinterpret_cast não altera o [valor de um ponteiro](<#/doc/language/pointer>) fora de alguns casos limitados que lidam com objetos [_ponteiro-interconvertíveis_](<#/doc/language/static_cast>):
```cpp
    struct S1 { int a; } s1;
    struct S2 { int a; private: int b; } s2; // not standard-layout
    union U { int a; double b; } u = {0};
    int arr[2];
    
    int* p1 = reinterpret_cast<int*>(&s1); // o valor de p1 é "ponteiro para s1.a" porque
                                           // s1.a e s1 são ponteiro-interconvertíveis
    
    int* p2 = reinterpret_cast<int*>(&s2); // o valor de p2 não é alterado por reinterpret_cast
                                           // e é "ponteiro para s2". 
    
    int* p3 = reinterpret_cast<int*>(&u);  // o valor de p3 é "ponteiro para u.a":
                                           // u.a e u são ponteiro-interconvertíveis
    
    double* p4 = reinterpret_cast<double*>(p3); // o valor de p4 é "ponteiro para u.b": u.a e
                                                // u.b são ponteiro-interconvertíveis porque
                                                // ambos são ponteiro-interconvertíveis com u
    
    int* p5 = reinterpret_cast<int*>(&arr); // o valor de p5 não é alterado por reinterpret_cast
                                            // e é "ponteiro para arr"
```

Realizar um acesso a membro de classe que designa um membro de dados não estático ou uma função membro não estática em um glvalue que não designa realmente um objeto do tipo apropriado - como um obtido através de um reinterpret_cast - resulta em comportamento indefinido:
```cpp
    struct S { int x; };
    struct T { int x; int f(); };
    struct S1 : S {};    // standard-layout
    struct ST : S, T {}; // not standard-layout
    
    S s = {};
    auto p = reinterpret_cast<T*>(&s); // o valor de p é "ponteiro para s"
    auto i = p->x; // a expressão de acesso a membro de classe é comportamento indefinido;
                   // s não é um objeto T
    p->x = 1; // undefined behavior
    p->f();   // undefined behavior
    
    S1 s1 = {};
    auto p1 = reinterpret_cast<S*>(&s1); // o valor de p1 é "ponteiro para o subobjeto S de s1"
    auto i = p1->x; // OK
    p1->x = 1;      // OK
    
    ST st = {};
    auto p2 = reinterpret_cast<S*>(&st); // o valor de p2 é "ponteiro para st"
    auto i = p2->x; // undefined behavior
    p2->x = 1;      // undefined behavior
```

Muitos compiladores emitem avisos de "strict aliasing" em tais casos, embora tecnicamente tais construções violem algo diferente do parágrafo comumente conhecido como a "regra de strict aliasing".

O propósito do strict aliasing e regras relacionadas é permitir a análise de alias baseada em tipo, que seria dizimada se um programa pudesse criar validamente uma situação onde dois ponteiros para tipos não relacionados (por exemplo, um int* e um float*) pudessem existir simultaneamente e ambos pudessem ser usados para carregar ou armazenar a mesma memória (veja [este e-mail no refletor SG12](<https://web.archive.org/web/20201128194944/http://www.open-std.org/pipermail/ub/2016-February/000565.html>)). Assim, qualquer técnica que pareça capaz de criar tal situação necessariamente invoca comportamento indefinido.

Quando é necessário interpretar os bytes de um objeto como um valor de um tipo diferente, [std::memcpy](<#/doc/string/byte/memcpy>) ou [`std::bit_cast`](<#/doc/numeric/bit_cast>)(desde C++20) podem ser usados:
```cpp
    double d = 0.1;
    std::int64_t n;
    static_assert(sizeof n == sizeof d);
    // n = *reinterpret_cast<std::int64_t*>(&d); // Undefined behavior
    std::memcpy(&n, &d, sizeof d);               // OK
    n = std::bit_cast<std::int64_t>(d);          // also OK
```

Se a implementação fornecer [std::intptr_t](<#/doc/types/integer>) e/ou [std::uintptr_t](<#/doc/types/integer>), então um cast de um ponteiro para um tipo de objeto ou _cv_ void para esses tipos é sempre bem definido. No entanto, isso não é garantido para um ponteiro para função. | (desde C++11)

Em C, a cópia e atribuição de agregados acessam o objeto agregado como um todo. Mas em C++ tais ações são sempre realizadas através de uma chamada de função membro, que acessa os subobjetos individuais em vez do objeto inteiro (ou, no caso de unions, copia a representação do objeto, ou seja, via unsigned char).

### Palavras-chave

[`reinterpret_cast`](<#/doc/keyword/reinterpret_cast>)

### Exemplo

Demonstra alguns usos de reinterpret_cast:

Execute este código
```cpp
    #include <cassert>
    #include <cstdint>
    #include <iostream>
    
    int f() { return 42; }
    
    int main()
    {
        int i = 7;
    
        // ponteiro para inteiro e vice-versa
        std::uintptr_t v1 = reinterpret_cast<std::uintptr_t>(&i); // static_cast is an error
        std::cout << "The value of &i is " << std::showbase << std::hex << v1 << '\n';
        int* p1 = reinterpret_cast<int*>(v1);
        assert(p1 == &i);
    
        // ponteiro para função para outra e vice-versa
        void(*fp1)() = reinterpret_cast<void(*)()>(f);
        // fp1(); undefined behavior
        int(*fp2)() = reinterpret_cast<int(*)()>(fp1);
        std::cout << std::dec << fp2() << '\n'; // safe
    
        // aliasing de tipo através de ponteiro
        char* p2 = reinterpret_cast<char*>(&i);
        std::cout << (p2[0] == '\x7' ? "This system is little-endian\n"
                                     : "This system is big-endian\n");
    
        // aliasing de tipo através de referência
        reinterpret_cast<unsigned int&>(i) = 42;
        std::cout << i << '\n';
    
        [[maybe_unused]] const int &const_iref = i;
        // int &iref = reinterpret_cast<int&>(
        //     const_iref); // compiler error - can't get rid of const
        // Must use const_cast instead: int &iref = const_cast<int&>(const_iref);
    }
```

Saída possível:
```
    The value of &i is 0x7fff352c3580
    42
    This system is little-endian
    42
```

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[CWG 195](<https://cplusplus.github.io/CWG/issues/195.html>) | C++98 | conversão entre ponteiros para função
e ponteiros para objeto não permitida | tornada condicionalmente suportada
[CWG 658](<https://cplusplus.github.io/CWG/issues/658.html>) | C++98 | o resultado das conversões de ponteiro era não especificado
(exceto para conversões de volta ao tipo original) | especificação fornecida para ponteiros
cujos tipos apontados satisfazem
os requisitos de alinhamento
[CWG 799](<https://cplusplus.github.io/CWG/issues/799.html>) | C++98 | não estava claro qual conversão de identidade
---|---|---
pode ser feita por reinterpret_cast | esclarecido
[CWG 1268](<https://cplusplus.github.io/CWG/issues/1268.html>) | C++11 | reinterpret_cast só podia fazer cast de
lvalues para tipos de referência | xvalues também permitidos
[CWG 2780](<https://cplusplus.github.io/CWG/issues/2780.html>) | C++98 | reinterpret_cast não podia fazer cast de
lvalues de função para outros tipos de referência | permitido
[CWG 2939](<https://cplusplus.github.io/CWG/issues/2939.html>) | C++17 | reinterpret_cast podia fazer cast de
prvalues para tipos de referência rvalue | não permitido

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   7.6.1.10 Reinterpret cast [expr.reinterpret.cast]

*   Padrão C++20 (ISO/IEC 14882:2020):

    *   7.6.1.9 Reinterpret cast [expr.reinterpret.cast]

*   Padrão C++17 (ISO/IEC 14882:2017):

    *   8.2.10 Reinterpret cast [expr.reinterpret.cast]

*   Padrão C++14 (ISO/IEC 14882:2014):

    *   5.2.10 Reinterpret cast [expr.reinterpret.cast]

*   Padrão C++11 (ISO/IEC 14882:2011):

    *   5.2.10 Reinterpret cast [expr.reinterpret.cast]

*   Padrão C++98 (ISO/IEC 14882:1998):

    *   5.2.10 Reinterpret cast [expr.reinterpret.cast]

*   Padrão C++03 (ISO/IEC 14882:2003):

    *   5.2.10 Reinterpret cast [expr.reinterpret.cast]

### Veja também

[ `const_cast` conversion ](<#/doc/language/const_cast>) | adiciona ou remove const
---|---
[ `static_cast` conversion ](<#/doc/language/static_cast>) | realiza conversões básicas
[ `dynamic_cast` conversion ](<#/doc/language/dynamic_cast>) | realiza conversões polimórficas verificadas
[ explicit casts ](<#/doc/language/explicit_cast>) | conversões permissivas entre tipos
[ standard conversions ](<#/doc/language/implicit_cast>) | conversões implícitas de um tipo para outro
[ bit_cast](<#/doc/numeric/bit_cast>)(C++20) | reinterpreta a representação de objeto de um tipo como a de outro
(function template)