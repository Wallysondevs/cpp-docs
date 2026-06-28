# Declaração de classe

Classes são tipos definidos pelo usuário, definidos por class-specifier, que aparece em decl-specifier-seq da sintaxe de [declaração](<#/doc/language/declarations>).

### Sintaxe

O especificador de classe tem a seguinte sintaxe:

---
class-key attr ﻿(optional) class-head-name `final`(optional) base-clause ﻿(optional) `{` member-specification `}` | (1) |
---|---|---
class-key attr ﻿(optional) base-clause ﻿(optional) `{` member-specification `}` | (2) |

1) Definição de classe nomeada

2) Definição de classe sem nome

- **class-key** — um de [`class`](<#/doc/keyword/class>), [`struct`](<#/doc/keyword/struct>) e [`union`](<#/doc/keyword/union>). As palavras-chave class e struct são idênticas, exceto pelo [acesso de membro](<#/doc/language/access>) padrão e pelo [acesso de classe base](<#/doc/language/derived_class>) padrão. Se for union, a declaração introduz um [tipo union](<#/doc/language/union>).
- **attr** — (desde C++11) qualquer número de [atributos](<#/doc/language/attributes>), pode incluir o especificador [`alignas`](<#/doc/language/alignas>)
- **class-head-name** — o nome da classe que está sendo definida, opcionalmente [qualificado](<#/doc/language/name>)
- `final` — (desde C++11) se presente, a classe [não pode ser derivada](<#/doc/language/final>)
- **base-clause** — lista de uma ou mais classes base e o modelo de herança usado para cada uma (veja [classe derivada](<#/doc/language/derived_class>))
- **member-specification** — lista de especificadores de acesso, declarações e definições de objetos membro e funções membro ([veja abaixo](<#/doc/language/class>))

### Declaração antecipada

Uma declaração da seguinte forma

---
class-key attr identifier `;`

Declara um tipo de classe que será definido posteriormente neste escopo. Até que a definição apareça, este nome de classe tem [tipo incompleto](<#/doc/language/incomplete_type>). Isso permite classes que se referem umas às outras:
```cpp
    class Vector; // forward declaration
    
    class Matrix
    {
        // ...
        friend Vector operator*(const Matrix&, const Vector&);
    };
    
    class Vector
    {
        // ...
        friend Vector operator*(const Matrix&, const Vector&);
    };
```

e se um arquivo fonte particular usa apenas ponteiros e referências para a classe, isso torna possível reduzir as dependências de #include:
```cpp
    // In MyStruct.h
    #include <iosfwd> // contains forward declaration of std::ostream
    
    struct MyStruct
    {
        int value;
        friend std::ostream& operator<<(std::ostream& os, const S& s);
        // definition provided in MyStruct.cpp file which uses #include <ostream>
    };
```

Se uma declaração antecipada aparece em escopo local, ela _oculta_ classes, variáveis, funções e todas as outras declarações do mesmo nome declaradas anteriormente que possam aparecer em escopos delimitadores:
```cpp
    struct s { int a; };
    struct s; // does nothing (s already defined in this scope)
    
    void g()
    {
        struct s; // forward declaration of a new, local struct "s"
                  // this hides global struct s until the end of this block
    
        s* p; // pointer to local struct s
    
        struct s { char* p; }; // definitions of the local struct s
    }
```

Note que um novo nome de classe também pode ser introduzido por um [especificador de tipo elaborado](<#/doc/language/elaborated_type_specifier>) que aparece como parte de outra declaração, mas apenas se a [busca de nome](<#/doc/language/lookup>) não conseguir encontrar uma classe declarada anteriormente com o mesmo nome.
```cpp
    class U;
    
    namespace ns
    {
        class Y f(class T p); // declares function ns::f and declares ns::T and ns::Y
    
        class U f(); // U refers to ::U
    
        // can use pointers and references to T and Y
        Y* p;
        T* q;
    }
```

### Especificação de membro

A especificação de membro, ou o _corpo_ de uma definição de classe, é uma sequência entre chaves de qualquer número dos seguintes:

1) Declarações de membro na forma
---
attr ﻿(optional) decl-specifier-seq ﻿(optional) member-declarator-list ﻿(optional) `;`
- **attr** — (desde C++11) qualquer número de [atributos](<#/doc/language/attributes>)
- **decl-specifier-seq** — sequência de [especificadores](<#/doc/language/declarations>). É opcional apenas nas declarações de construtores, destrutores e [funções de conversão](<#/doc/language/cast_operator>) de tipo definidas pelo usuário
- **member-declarator-list** — semelhante a uma [init-declarator-list](<#/doc/language/declarations>), mas adicionalmente permite [declaração de bit-field](<#/doc/language/bit_field>), [pure-specifier](<#/doc/language/abstract_class>), e virt-specifier (`[override](<#/doc/language/override>)` ou `[final](<#/doc/language/final>)`)(desde C++11), e não permite a [sintaxe de inicialização direta não-lista](<#/doc/language/direct_initialization>).

Esta declaração pode declarar [membros de dados](<#/doc/language/data_members>) [estáticos](<#/doc/language/static>) e não estáticos e [funções membro](<#/doc/language/member_functions>), [typedefs](<#/doc/language/typedef>) membro, [enumerações](<#/doc/language/enum>) membro e [classes aninhadas](<#/doc/language/nested_classes>). Também pode ser uma [declaração friend](<#/doc/language/friend>).
```cpp
    class S
    {
        int d1;             // non-static data member
        int a[10] = {1, 2}; // non-static data member with initializer (C++11)
    
        static const int d2 = 1; // static data member with initializer
    
        virtual void f1(int) = 0; // pure virtual member function
    
        std::string d3, *d4, f2(int); // two data members and a member function
    
        enum { NORTH, SOUTH, EAST, WEST };
    
        struct NestedS
        {
            std::string s;
        } d5, *d6;
    
        typedef NestedS value_type, *pointer_type;
    };
```

2) Definições de função, que declaram e definem [funções membro](<#/doc/language/member_functions>) ou [funções friend](<#/doc/language/friend>). Um ponto e vírgula após a definição de uma função membro é opcional. Todas as funções definidas dentro do corpo de uma classe são automaticamente [inline](<#/doc/language/inline>), a menos que estejam anexadas a um [módulo nomeado](<#/doc/language/modules>)(desde C++20).
```cpp
    class M
    {
        std::size_t C;
        std::vector<int> data;
    public:
        M(std::size_t R, std::size_t C) : C(C), data(R*C) {} // constructor definition
    
        int operator()(std::size_t r, std::size_t c) const // member function definition
        {
            return data[r * C + c];
        }
    
        int& operator()(std::size_t r, std::size_t c) // another member function definition
        {
            return data[r * C + c];
        }
    };
```

3) [Especificadores de acesso](<#/doc/language/access>) `public:`, `protected:`, e `private:`
```cpp
    class S
    {
    public:
        S();          // public constructor
        S(const S&);  // public copy constructor
        virtual ~S(); // public virtual destructor
    private:
        int* ptr; // private data member
    };
```

4) [Using-declarations](<#/doc/language/using_declaration>):
```cpp
    class Base
    {
    protected:
        int d;
    };
    
    class Derived : public Base
    {
    public:
        using Base::d;    // make Base's protected member d a public member of Derived
        using Base::Base; // inherit all bases' constructors (C++11)
    };
```

5) Declarações [`static_assert`](<#/doc/language/static_assert>):
```cpp
    template<typename T>
    struct Foo
    {
        static_assert(std::is_floating_point<T>::value, "Foo<T>: T must be floating point");
    };
```

6) [declarações de member template](<#/doc/language/member_template>):
```cpp
    struct S
    {
        template<typename T>
        void f(T&& n);
    
        template<class CharT>
        struct NestedS
        {
            std::basic_string<CharT> s;
        };
    };
```

7) [declarações de alias](<#/doc/language/type_alias>):
```cpp
    template<typename T>
    struct identity
    {
        using type = T;
    };
```

```cpp
  // (desde C++11)
8) deduction guides de member class templates:
```
```cpp
    struct S
    {
        template<class CharT>
        struct NestedS
        {
            std::basic_string<CharT> s;
        };
    
        template<class CharT>
        NestedS(std::basic_string<CharT>) -> NestedS<CharT>;
    };
```

| (desde C++17)
9) [Using-enum-declarations](<#/doc/language/enum>):
```cpp
    enum class color { red, orange, yellow };
    
    struct highlight
    {
        using enum color;
    };
```

| (desde C++20)

### Classes locais

Uma declaração de classe pode aparecer dentro do corpo de uma função, caso em que define uma _classe local_. O nome de tal classe existe apenas dentro do escopo da função e não é acessível externamente.

* Membros de uma classe local só podem ser declarados na definição dessa classe, exceto que membros que são [classes aninhadas](<#/doc/language/nested_classes>) também podem ser declarados no [escopo de bloco](<#/doc/language/scope>) delimitador mais próximo dessa classe.
* Uma classe aninhada dentro de uma classe local também é uma classe local.
* Uma classe local não pode ter membros de dados estáticos.
* Funções membro de uma classe local não têm linkage.
* Funções membro de uma classe local devem ser definidas inteiramente dentro do corpo da classe.
* Classes locais, exceto [closure types](<#/doc/language/lambda>)(desde C++14), não podem ter member templates.
* Classes locais não podem ter [friend templates](<#/doc/language/friend>).
* Classes locais não podem definir [funções friend](<#/doc/language/friend>) dentro da definição da classe.
* Uma classe local dentro de uma função (incluindo função membro) pode acessar os mesmos nomes que a função delimitadora pode acessar.
* Classes locais não podiam ser usadas como argumentos de template.

| (até C++11)

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{1, 2, 3};
    
        struct Local
        {
            bool operator()(int n, int m)
            {
                return n > m;
            }
        };
    
        std::sort(v.begin(), v.end(), Local()); // since C++11
    
        for (int n : v)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    3 2 1
```

### Palavras-chave

[`class`](<#/doc/keyword/class>), [`struct`](<#/doc/keyword/struct>), [`union`](<#/doc/keyword/union>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1693](<https://cplusplus.github.io/CWG/issues/1693.html>) | C++98 | declarações de membro não podiam ser vazias | declaração vazia permitida
[CWG 1930](<https://cplusplus.github.io/CWG/issues/1930.html>) | C++98 | member-declarator-list podia ser vazia quando decl-specifier-seq contém um especificador de classe de armazenamento ou qualificador cv | a lista não deve ser vazia
[CWG 2890](<https://cplusplus.github.io/CWG/issues/2890.html>) | C++98 | não estava claro onde os membros de classes aninhadas podem ser declarados | esclarecido

### Veja também

[Documentação C](<#/>) para declaração de Struct
---
* [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
* [Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão