# especificador explicit

### Sintaxe  
  
---  
```cpp
`explicit`  // (1)
`explicit (` expression `)`  // (2) (desde C++20)
expression |  \-  |  expressão constante convertida contextualmente do tipo bool
```
  
  

1) Especifica que um construtor ou função de conversão (desde C++11) ou [guia de dedução](<#/doc/language/ctad>) (desde C++17) é explicit, ou seja, não pode ser usado para [conversões implícitas](<#/doc/language/implicit_cast>) e [inicialização por cópia](<#/doc/language/copy_initialization>).

2) O especificador explicit pode ser usado com uma expressão constante. A função é explicit se e somente se essa expressão constante for avaliada como true. | (desde C++20)  
  
O especificador explicit só pode aparecer dentro da decl-specifier-seq da declaração de um construtor ou função de conversão (desde C++11) dentro de sua definição de classe. 

### Notas

Um construtor com um único parâmetro não-default (até C++11) que é declarado sem o especificador de função explicit é chamado de [construtor de conversão](<#/doc/language/converting_constructor>). 

Ambos os construtores (exceto [de cópia](<#/doc/language/copy_constructor>)/[de movimento](<#/doc/language/move_constructor>)) e funções de conversão definidas pelo usuário podem ser function templates; o significado de explicit não muda. 

Um token `(` que segue explicit é sempre analisado como parte do especificador explicit: 
```cpp 
    struct S
    {
        explicit (S)(const S&);    // error in C++20, OK in C++17
        explicit (operator int)(); // error in C++20, OK in C++17
    };
```

```cpp
  // (desde C++20)
Macro de teste de recurso | Valor | Padrão | Recurso
`__cpp_conditional_explicit` | `201806L` | (C++20) | explicit condicional
```
  
### Palavras-chave

[`explicit`](<#/doc/keyword/explicit>)

### Exemplo

Execute este código
```cpp 
    struct A
    {
        A(int) {}      // converting constructor
        A(int, int) {} // converting constructor (C++11)
        operator bool() const { return true; }
    };
     
    struct B
    {
        explicit B(int) {}
        explicit B(int, int) {}
        explicit operator bool() const { return true; }
    };
     
    int main()
    {
        A a1 = 1;      // OK: copy-initialization selects A::A(int)
        A a2(2);       // OK: direct-initialization selects A::A(int)
        A a3 {4, 5};   // OK: direct-list-initialization selects A::A(int, int)
        A a4 = {4, 5}; // OK: copy-list-initialization selects A::A(int, int)
        A a5 = (A)1;   // OK: explicit cast performs static_cast
        if (a1) { }    // OK: A::operator bool()
        bool na1 = a1; // OK: copy-initialization selects A::operator bool()
        bool na2 = static_cast<bool>(a1); // OK: static_cast performs direct-initialization
     
    //  B b1 = 1;      // error: copy-initialization does not consider B::B(int)
        B b2(2);       // OK: direct-initialization selects B::B(int)
        B b3 {4, 5};   // OK: direct-list-initialization selects B::B(int, int)
    //  B b4 = {4, 5}; // error: copy-list-initialization does not consider B::B(int, int)
        B b5 = (B)1;   // OK: explicit cast performs static_cast
        if (b2) { }    // OK: B::operator bool()
    //  bool nb1 = b2; // error: copy-initialization does not consider B::operator bool()
        bool nb2 = static_cast<bool>(b2); // OK: static_cast performs direct-initialization
     
        {}(a4, a5, na1, na2, b5, nb2); // suppresses “unused variable” warnings
    }
```

### Veja também

  * [construtor de conversão](<#/doc/language/converting_constructor>)
  * [inicialização](<#/doc/language/initialization>)
  * [inicialização por cópia](<#/doc/language/copy_initialization>)
  * [inicialização direta](<#/doc/language/direct_initialization>)
