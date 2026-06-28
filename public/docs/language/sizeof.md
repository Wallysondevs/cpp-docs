# operador sizeof

Consulta o tamanho do objeto ou tipo.

Usado quando o tamanho real do objeto precisa ser conhecido.

### Sintaxe

---
`sizeof(` type `)` | (1) |
---|---|---
`sizeof` expression ` | (2) |

1) Retorna o tamanho em bytes da [representação do objeto](<#/doc/language/objects>) do tipo.

2) Retorna o tamanho em bytes da representação do objeto do tipo da expressão, se essa expressão for avaliada.

- **type** — um type-id (veja [nomeação de tipo](<#/doc/language/type-id>))
- **expression** — uma expressão cuja [precedência de operador](<#/doc/language/operator_precedence>) não é menor que `sizeof` (ex. sizeof a + b é interpretado como (sizeof a) + b em vez de sizeof (a + b))

O resultado de uma expressão `sizeof` é uma [expressão constante](<#/doc/language/constant_expression>) do tipo [std::size_t](<#/doc/types/size_t>).

### Observações

Dependendo da arquitetura do computador, um [byte](<https://en.wikipedia.org/wiki/byte> "enwiki:byte") pode consistir de 8 ou mais bits, o número exato sendo registrado em [CHAR_BIT](<#/doc/types/climits>).

As seguintes expressões `sizeof` sempre avaliam para 1:

  * sizeof(char)
  * sizeof(signed char)
  * sizeof(unsigned char)

  * sizeof([std::byte](<#/doc/types/byte>))

| (desde C++17)

  * sizeof(char8_t)

| (desde C++20)

`sizeof` não pode ser usado com tipos de função, tipos incompletos, ou lvalues de bit-field (até C++11) glvalues (desde C++11).

Quando aplicado a um tipo de referência, o resultado é o tamanho do tipo referenciado.

Quando aplicado a um tipo de classe, o resultado é o número de bytes ocupados por um objeto completo dessa classe, incluindo qualquer preenchimento adicional necessário para colocar tal objeto em um array. O número de bytes ocupados por um [subobjeto potencialmente sobreposto](<#/doc/language/objects>) pode ser menor que o tamanho desse objeto.

O resultado de `sizeof` é sempre diferente de zero, mesmo se aplicado a um tipo de classe vazio.

Quando aplicado a uma expressão, `sizeof` [não avalia a expressão](<#/doc/language/expressions>) (ou seja, a expressão é um operando não avaliado) (desde C++11), e mesmo que a expressão designe um objeto polimórfico, o resultado é o tamanho do tipo estático da expressão. Conversões de lvalue para rvalue, de array para ponteiro, ou de função para ponteiro não são realizadas. [Materialização temporária](<#/doc/language/implicit_cast>), no entanto, é (formalmente) realizada para argumentos prvalue: o programa é malformado se o argumento não for destrutível. (desde C++17)

### Palavras-chave

[`sizeof`](<#/doc/keyword/sizeof>)

### Exemplo

A saída do exemplo corresponde a um sistema com ponteiros de 64 bits e int de 32 bits (também conhecido como [**LP64** ou **LLP64**](<#/doc/language/types>)).

Execute este código
```cpp
    #include <cstdlib>
    #include <iostream>
     
    struct Empty          { };
    struct Base           { int a; };
    struct Derived : Base { int b; };
    struct Bit            { unsigned bit: 1; };
    struct CharChar       { char c; char c2; };
    struct CharCharInt    { char c; char c2; int i; };
    struct IntCharChar    { int i;  char c;  char c2; };
    struct CharIntChar    { char c; int i;   char c2; };
    struct CharShortChar  { char c; short s; char c2; };
     
    int main()
    {
        Empty e;
        Derived d;
        Base& b = d;
        [[maybe_unused]] Bit bit;
        int a[10];
     
        auto f = & { return sizeof(int[10]) == sizeof a ? throw 1 : e; };
    //  f(); // the return type is Empty, but always throws 1
     
        auto println =  size) { std::cout << rem << size << '\n'; };
     
        println( "1) sizeof empty class:              ", sizeof e                     );
        println( "2) sizeof pointer:                  ", sizeof &e                    );
        println( "3) sizeof(Bit) class:               ", sizeof(Bit)                  );
        println( "4) sizeof(int[10]) array of 10 int: ", sizeof(int[10])              );
        println( "5) sizeof a        array of 10 int: ", sizeof a                     );
        println( "6) length of array of 10 int:       ", ((sizeof a) / (sizeof *a))   );
        println( "7) length of array of 10 int (2):   ", ((sizeof a) / (sizeof a[0])) );
        println( "8) sizeof the Derived class:        ", sizeof d                     );
        println( "9) sizeof the Derived through Base: ", sizeof b                     );
        println( "A) sizeof(unsigned):                ", sizeof(unsigned)             );
        println( "B) sizeof(int):                     ", sizeof(int)                  );
        println( "C) sizeof(short):                   ", sizeof(short)                );
        println( "D) sizeof(char):                    ", sizeof(char)                 );
        println( "E) sizeof(CharChar):                ", sizeof(CharChar)             );
        println( "F) sizeof(CharCharInt):             ", sizeof(CharCharInt)          );
        println( "G) sizeof(IntCharChar):             ", sizeof(IntCharChar)          );
        println( "H) sizeof(CharIntChar):             ", sizeof(CharIntChar)          );
        println( "I) sizeof(CharShortChar):           ", sizeof(CharShortChar)        );
        println( "J) sizeof f():                      ", sizeof f()                   );
        println( "K) sizeof Base::a:                  ", sizeof Base::a               );
     
    //  println( "sizeof function:        ", sizeof(void()) ); // error
    //  println( "sizeof incomplete type: ", sizeof(int[])  ); // error
    //  println( "sizeof bit-field:       ", sizeof bit.bit ); // error
    }
```

Saída possível:
```
    1) sizeof empty class:              1
    2) sizeof pointer:                  8
    3) sizeof(Bit) class:               4
    4) sizeof(int[10]) array of 10 int: 40
    5) sizeof a        array of 10 int: 40
    6) length of array of 10 int:       10
    7) length of array of 10 int (2):   10
    8) sizeof the Derived class:        8
    9) sizeof the Derived through Base: 4
    A) sizeof(unsigned):                4
    B) sizeof(int):                     4
    C) sizeof(short):                   2
    D) sizeof(char):                    1
    E) sizeof(CharChar):                2
    F) sizeof(CharCharInt):             8
    G) sizeof(IntCharChar):             8
    H) sizeof(CharIntChar):             12
    I) sizeof(CharShortChar):           6
    J) sizeof f():                      1
    K) sizeof Base::a:                  4
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 1553](<https://cplusplus.github.io/CWG/issues/1553.html>) | C++11 | `sizeof` poderia ser usado com xvalues de bit-field | proibido

### Veja também

`[alignof](<#/doc/language/alignof>)` (C++11) | consulta os requisitos de alinhamento de um tipo
(operador)
[`sizeof...` operator](<#/doc/language/sizeof...>) (C++11) | consulta o número de elementos em um [pack](<#/doc/language/parameter_pack>)
---|---
[ numeric_limits](<#/doc/types/numeric_limits>) | fornece uma interface para consultar propriedades de todos os tipos numéricos fundamentais
(modelo de classe)
[Documentação C](<#/>) para sizeof