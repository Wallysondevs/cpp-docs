# Construtor de conversão

Um construtor que não é declarado com o especificador [explicit](<#/doc/language/explicit>) e que pode ser chamado com um único parâmetro(até C++11) é chamado de _construtor de conversão_.

Ao contrário dos construtores explicit, que são considerados apenas durante a [inicialização direta](<#/doc/language/direct_initialization>) (que inclui [conversões explícitas](<#/doc/language/explicit_cast>) como [static_cast](<#/doc/language/static_cast>)), construtores de conversão também são considerados durante a [inicialização por cópia](<#/doc/language/copy_initialization>), como parte de uma [sequência de conversão definida pelo usuário](<#/doc/language/implicit_cast>).

Diz-se que um construtor de conversão especifica uma conversão implícita dos tipos de seus argumentos (se houver) para o tipo de sua classe. Note que uma [função de conversão definida pelo usuário](<#/doc/language/cast_operator>) não-explicit também especifica uma conversão implícita.

[Construtores de cópia](<#/doc/language/copy_constructor>) e [construtores de movimento](<#/doc/language/move_constructor>) implicitamente declarados e definidos pelo usuário não-explicit são construtores de conversão.

### Exemplo

Execute este código
```cpp
    struct A
    {
        A() { }         // construtor de conversão (desde C++11)  
        A(int) { }      // construtor de conversão
        A(int, int) { } // construtor de conversão (desde C++11)
    };
    
    struct B
    {
        explicit B() { }
        explicit B(int) { }
        explicit B(int, int) { }
    };
    
    int main()
    {
        A a1 = 1;      // OK: inicialização por cópia seleciona A::A(int)
        A a2(2);       // OK: inicialização direta seleciona A::A(int)
        A a3{4, 5};    // OK: inicialização de lista direta seleciona A::A(int, int)
        A a4 = {4, 5}; // OK: inicialização de lista por cópia seleciona A::A(int, int)
        A a5 = (A)1;   // OK: cast explícito realiza static_cast, inicialização direta
    
    //  B b1 = 1;      // erro: inicialização por cópia não considera B::B(int)
        B b2(2);       // OK: inicialização direta seleciona B::B(int)
        B b3{4, 5};    // OK: inicialização de lista direta seleciona B::B(int, int)
    //  B b4 = {4, 5}; // erro: inicialização de lista por cópia selecionou um construtor explicit
                       //        B::B(int, int)
        B b5 = (B)1;   // OK: cast explícito realiza static_cast, inicialização direta
        B b6;          // OK, inicialização padrão
        B b7{};        // OK, inicialização de lista direta
    //  B b8 = {};     // erro: inicialização de lista por cópia selecionou um construtor explicit
                       //        B::B()
    
        {}(a1, a4, a4, a5, b5); // pode suprimir avisos de "variável não utilizada"
    }
```

### Veja também

  * [atribuição por cópia](<#/doc/language/as_operator>)
  * [construtor de cópia](<#/doc/language/copy_constructor>)
  * [elision de cópia](<#/doc/language/copy_elision>)
  * [construtor padrão](<#/doc/language/default_constructor>)
  * [destrutor](<#/doc/language/destructor>)
  * [`explicit`](<#/doc/language/explicit>)
  * [inicialização](<#/doc/language/initialization>)
    * [inicialização de agregado](<#/doc/language/aggregate_initialization>)
    * [inicialização constante](<#/doc/language/constant_initialization>)
    * [inicialização por cópia](<#/doc/language/copy_initialization>)
    * [inicialização padrão](<#/doc/language/default_initialization>)
    * [inicialização direta](<#/doc/language/direct_initialization>)
    * [lista de inicializadores](<#/doc/language/initializer_list>)
    * [inicialização de lista](<#/doc/language/list_initialization>)
    * [inicialização de referência](<#/doc/language/reference_initialization>)
    * [inicialização por valor](<#/doc/language/value_initialization>)
    * [inicialização zero](<#/doc/language/zero_initialization>)
  * [atribuição por movimento](<#/doc/language/move_operator>)
  * [construtor de movimento](<#/doc/language/move_constructor>)
  * [new](<#/doc/language/new>)
