# Inicialização-zero

Define o valor inicial de um objeto como zero.

### Sintaxe

Note que esta não é a sintaxe para inicialização-zero, que não possui uma sintaxe dedicada na linguagem. Estes são exemplos de outros tipos de inicializações que podem realizar a inicialização-zero.

---
`static` T object `;` | (1) |
---|---|---
T `()` `;` T t `=` `{}` `;` T `{}` `;` (desde C++11) | (2) |
CharT array `[` n `]` `=` `"` short-sequence `";` | (3) |

### Explicação

A inicialização-zero é realizada nas seguintes situações:

1) Para cada variável nomeada com [duração de armazenamento](<#/doc/language/storage_duration>) static ou thread-local (desde C++11) que não está sujeita a [inicialização constante](<#/doc/language/constant_initialization>), antes de qualquer outra inicialização.

2) Como parte da sequência de [inicialização por valor](<#/doc/language/value_initialization>) para tipos não-classe e para membros de tipos classe inicializados por valor que não possuem construtores, incluindo a inicialização por valor de elementos de [agregados](<#/doc/language/aggregate_initialization>) para os quais nenhum inicializador é fornecido.

3) Quando um array de qualquer [tipo de caractere](<#/doc/language/types>) é [inicializado com um literal de string](<#/doc/language/aggregate_initialization>) que é muito curto, o restante do array é inicializado-zero.

Os efeitos da inicialização-zero são:

*   Se `T` é um [tipo escalar](<#/doc/named_req/ScalarType>), o objeto é inicializado com o valor obtido pela [conversão explícita](<#/doc/language/explicit_cast>) do literal inteiro ​0​ (zero) para `T`.
*   Se `T` é um tipo classe não-union:

    *   todos os [bits de preenchimento](<#/doc/language/objects>) são inicializados com bits zero,
    *   cada [membro de dados](<#/doc/language/data_members>) não-estático é inicializado-zero,
    *   cada [subobjeto](<#/doc/language/objects>) de classe base não-virtual é inicializado-zero, e
    *   se o objeto não é um subobjeto de classe base, cada subobjeto de [classe base virtual](<#/doc/language/derived_class>) é inicializado-zero.

*   Se `T` é um tipo union:

    *   todos os bits de preenchimento são inicializados com bits zero, e
    *   o primeiro membro de dados nomeado não-estático do objeto é inicializado-zero.

*   Se `T` é um tipo array, cada elemento é inicializado-zero.
*   Se `T` é um tipo referência, nada é feito.

### Notas

Conforme descrito em [inicialização não-local](<#/doc/language/initialization>), variáveis static e thread-local (desde C++11) que não são inicializadas constantemente são inicializadas-zero antes que qualquer outra inicialização ocorra. Se a definição de uma variável não-local não-classe não possui um inicializador, então a inicialização padrão não faz nada, deixando o resultado da inicialização-zero anterior inalterado.

Um ponteiro inicializado-zero é o valor de ponteiro nulo de seu tipo, mesmo que o valor do ponteiro nulo não seja zero integral.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    
    struct A
    {
        int a, b, c;
    };
    
    double f[3];   // inicializado-zero para três 0.0
    
    int* p;        // inicializado-zero para valor de ponteiro nulo
                   // (mesmo que o valor não seja zero integral)
    
    std::string s; // inicializado-zero para valor indeterminado, então
                   // inicializado por padrão para "" pelo construtor padrão de std::string
    
    int main(int argc, char*[])
    {
        delete p; // seguro deletar um ponteiro nulo
    
        static int n = argc; // inicializado-zero para 0 e então inicializado por cópia para argc
        std::cout << "n = " << n << '\n';
    
        A a = A(); // o efeito é o mesmo que: A a{}; ou A a = {};
        std::cout << "a = {" << a.a << ' ' << a.b << ' ' << a.c << "}\n";
    }
```

Saída possível:
```
    n = 1
    a = {0 0 0}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 277](<https://cplusplus.github.io/CWG/issues/277.html>) | C++98 | ponteiros podem ser inicializados com uma expressão não-constante de valor 0, que não é uma constante de ponteiro nulo | deve inicializar com uma expressão constante integral de valor 0
[CWG 694](<https://cplusplus.github.io/CWG/issues/694.html>) | C++98 | inicialização-zero para tipos classe ignorava preenchimento | preenchimento é inicializado com bits zero
[CWG 903](<https://cplusplus.github.io/CWG/issues/903.html>) | C++98 | inicialização-zero para tipos escalares definia o valor inicial para o valor convertido de uma expressão constante integral com valor 0 | o objeto é inicializado com o valor convertido do literal inteiro ​0​
[CWG 2026](<https://cplusplus.github.io/CWG/issues/2026.html>) | C++98 | a inicialização-zero era especificada para sempre ocorrer primeiro, mesmo antes da inicialização constante | nenhuma inicialização-zero se a inicialização constante se aplica
[CWG 2196](<https://cplusplus.github.io/CWG/issues/2196.html>) | C++98 | inicialização-zero para tipos classe ignorava subobjetos de classe base | eles também são inicializados-zero
[CWG 2253](<https://cplusplus.github.io/CWG/issues/2253.html>) | C++98 | não estava claro se a inicialização-zero se aplica a campos de bits sem nome | ela se aplica (todos os bits de preenchimento são inicializados com bits zero)

### Veja também

*   [constructor](<#/doc/language/initializer_list>)
*   [atribuição por cópia](<#/doc/language/as_operator>)
*   [construtor padrão](<#/doc/language/default_constructor>)
*   [inicialização](<#/doc/language/initialization>)
    *   [inicialização de agregado](<#/doc/language/aggregate_initialization>)
    *   [inicialização constante](<#/doc/language/constant_initialization>)
    *   [inicialização por cópia](<#/doc/language/copy_initialization>)
    *   [inicialização padrão](<#/doc/language/default_initialization>)
    *   [inicialização direta](<#/doc/language/direct_initialization>)
    *   [inicialização por lista](<#/doc/language/list_initialization>)
    *   [inicialização por valor](<#/doc/language/value_initialization>)
*   [atribuição por movimento](<#/doc/language/move_operator>)
*   [`new`](<#/doc/language/new>)
