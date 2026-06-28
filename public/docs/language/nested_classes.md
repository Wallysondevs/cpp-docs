# Classes aninhadas

Uma declaração de uma [class/struct](<#/doc/language/class>) ou [union](<#/doc/language/union>) pode aparecer dentro de outra classe. Tal declaração define uma _classe aninhada_.

### Explicação

O nome da classe aninhada existe no escopo da classe envolvente, e a pesquisa de nomes a partir de uma função membro de uma classe aninhada visita o escopo da classe envolvente após examinar o escopo da classe aninhada. Como qualquer membro de sua classe envolvente, a classe aninhada tem acesso a todos os nomes (private, protected, etc) aos quais a classe envolvente tem acesso, mas é de outra forma independente e não tem acesso especial ao [`this` pointer](<#/doc/language/this>) da classe envolvente. Declarações em uma classe aninhada podem usar quaisquer membros da classe envolvente, seguindo as [regras de uso usuais](<#/doc/language/data_members>) para os membros não-estáticos.
```cpp
    int x, y; // globais
    class enclose // classe envolvente
    {
        // nota: membros privados
        int x;
        static int s;
    public:
        struct inner // classe aninhada
        {
            void f(int i)
            {
                x = i; // Erro: não é possível escrever em enclose::x não-estático sem uma instância
                int a = sizeof x; // Erro até C++11,
                                  // OK em C++11: operando de sizeof não é avaliado,
                                  // este uso do enclose::x não-estático é permitido.
                s = i;   // OK: pode atribuir ao enclose::s estático
                ::x = i; // OK: pode atribuir ao x global
                y = i;   // OK: pode atribuir ao y global
            }
 
            void g(enclose* p, int i)
            {
                p->x = i; // OK: atribui a enclose::x
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
 
    int enclose::inner::x = 1;       // definição
    void enclose::inner::f(int i) {} // definição
```

Classes aninhadas podem ser *forward-declared* e posteriormente definidas, seja dentro do mesmo corpo da classe envolvente, ou fora dele:
```cpp
    class enclose
    {
        class nested1;    // forward declaration
        class nested2;    // forward declaration
        class nested1 {}; // definição de classe aninhada
    };
 
    class enclose::nested2 {}; // definição de classe aninhada
```

Declarações de classes aninhadas obedecem aos especificadores de [acesso a membros](<#/doc/language/access>), uma classe membro privada não pode ser nomeada fora do escopo da classe envolvente, embora objetos dessa classe possam ser manipulados:
```cpp
    class enclose
    {
        struct nested // membro privado
        {
            void g() {}
        };
    public:
        static nested f() { return nested{}; }
    };
 
    int main()
    {
        //enclose::nested n1 = enclose::f(); // erro: 'nested' é privado
 
        enclose::f().g();       // OK: não nomeia 'nested'
        auto n2 = enclose::f(); // OK: não nomeia 'nested'
        n2.g();
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 45](<https://cplusplus.github.io/CWG/issues/45.html>) | C++98 | os membros de uma classe aninhada não podem acessar a classe envolvente e seus friends | eles têm os mesmos direitos de acesso que outros membros da classe envolvente (também resolve os problemas CWG #8 e #10)

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):
  * 11.4.12 Declarações de classes aninhadas [class.nest]
* Padrão C++20 (ISO/IEC 14882:2020):
  * 11.4.10 Declarações de classes aninhadas [class.nest]
* Padrão C++17 (ISO/IEC 14882:2017):
  * 12.2.5 Declarações de classes aninhadas [class.nest]
* Padrão C++14 (ISO/IEC 14882:2014):
  * 9.7 Declarações de classes aninhadas [class.nest]
* Padrão C++11 (ISO/IEC 14882:2011):
  * 9.7 Declarações de classes aninhadas [class.nest]
* Padrão C++98 (ISO/IEC 14882:1998):
  * 9.7 Declarações de classes aninhadas [class.nest]
