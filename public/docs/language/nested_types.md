# Classes aninhadas

Uma declaração de uma [classe/struct](<#/doc/language/class>) ou [union](<#/doc/language/union>) pode aparecer dentro de outra classe. Tal declaração define uma _classe aninhada_.

### Explicação

O nome da classe aninhada existe no escopo da classe envolvente, e a pesquisa de nome a partir de uma função membro de uma classe aninhada visita o escopo da classe envolvente após examinar o escopo da classe aninhada. Assim como qualquer membro de sua classe envolvente, a classe aninhada tem acesso a todos os nomes (private, protected, etc.) aos quais a classe envolvente tem acesso, mas é de outra forma independente e não tem acesso especial ao [`this` pointer](<#/doc/language/this>) da classe envolvente. Declarações em uma classe aninhada podem usar quaisquer membros da classe envolvente, seguindo as [regras de uso usuais](<#/doc/language/data_members>) para os membros não-estáticos.
```cpp
    int x, y; // globals
    class enclose // enclosing class
    {
        // note: private members
        int x;
        static int s;
    public:
        struct inner // nested class
        {
            void f(int i)
            {
                x = i; // Error: can't write to non-static enclose::x without instance
                int a = sizeof x; // Error until C++11,
                                  // OK in C++11: operand of sizeof is unevaluated,
                                  // this use of the non-static enclose::x is allowed.
                s = i;   // OK: can assign to the static enclose::s
                ::x = i; // OK: can assign to global x
                y = i;   // OK: can assign to global y
            }
    
            void g(enclose* p, int i)
            {
                p->x = i; // OK: assign to enclose::x
            }
        };
    };
```

Funções [friend](<#/doc/language/friend>) definidas dentro de uma classe aninhada não têm acesso especial aos membros da classe envolvente, mesmo que a pesquisa a partir do corpo de uma função membro definida dentro de uma classe aninhada possa encontrar os membros privados da classe envolvente.

Definições fora da classe dos membros de uma classe aninhada aparecem no namespace da classe envolvente:
```cpp
    struct enclose
    {
        struct inner
        {
            static int x;
            void f(int i);
        };
    };
    
    int enclose::inner::x = 1;       // definition
    void enclose::inner::f(int i) {} // definition
```

Classes aninhadas podem ser forward-declared (declaradas antecipadamente) e posteriormente definidas, seja dentro do mesmo corpo da classe envolvente, ou fora dele:
```cpp
    class enclose
    {
        class nested1;    // forward declaration
        class nested2;    // forward declaration
        class nested1 {}; // definition of nested class
    };
    
    class enclose::nested2 {}; // definition of nested class
```

Declarações de classes aninhadas obedecem aos especificadores de [acesso a membros](<#/doc/language/access>); uma classe membro privada não pode ser nomeada fora do escopo da classe envolvente, embora objetos dessa classe possam ser manipulados:
```cpp
    class enclose
    {
        struct nested // private member
        {
            void g() {}
        };
    public:
        static nested f() { return nested{}; }
    };
    
    int main()
    {
        //enclose::nested n1 = enclose::f(); // error: 'nested' is private
    
        enclose::f().g();       // OK: does not name 'nested'
        auto n2 = enclose::f(); // OK: does not name 'nested'
        n2.g();
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Applied to | Behavior as published | Correct behavior
---|---|---|---
[CWG 45](<https://cplusplus.github.io/CWG/issues/45.html>) | C++98 | os membros de uma classe aninhada não podem acessar a classe envolvente e seus friends | eles têm os mesmos direitos de acesso que outros membros da classe envolvente (também resolve os problemas CWG #8 e #10)

### Referências

*   C++23 standard (ISO/IEC 14882:2024):

    *   11.4.12 Nested class declarations [class.nest]

*   C++20 standard (ISO/IEC 14882:2020):

    *   11.4.10 Nested class declarations [class.nest]

*   C++17 standard (ISO/IEC 14882:2017):

    *   12.2.5 Nested class declarations [class.nest]

*   C++14 standard (ISO/IEC 14882:2014):

    *   9.7 Nested class declarations [class.nest]

*   C++11 standard (ISO/IEC 14882:2011):

    *   9.7 Nested class declarations [class.nest]

*   C++98 standard (ISO/IEC 14882:1998):

    *   9.7 Nested class declarations [class.nest]
