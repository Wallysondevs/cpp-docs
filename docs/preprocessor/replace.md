# Substituindo macros de texto

O pré-processador suporta a substituição de macros de texto. A substituição de macros de texto tipo função também é suportada.

### Sintaxe

---
`#define` identifier replacement-list ﻿(optional) | (1) |
---|---|---
`#define` identifier ﻿`(` parameters ﻿`)` replacement-list ﻿(optional) | (2) |
`#define` identifier ﻿`(` parameters ﻿`, ...)` replacement-list ﻿(optional) | (3) | (desde C++11)
`#define` identifier ﻿`(...)` replacement-list ﻿(optional) | (4) | (desde C++11)
`#undef` identifier | (5) |

### Explicação

#### Diretivas #define

As diretivas #define definem o identificador como macro, ou seja, instruem o compilador a substituir a maioria das ocorrências sucessivas do identificador pela replacement-list, que será processada adicionalmente. Exceções surgem das regras de [varredura e substituição](<#/doc/preprocessor/replace>). Se o identificador já estiver definido como qualquer tipo de macro, o programa é malformado, a menos que as definições sejam idênticas.

##### Macros tipo objeto

Macros tipo objeto substituem cada ocorrência do identificador definido pela replacement-list. A versão (1) da diretiva #define se comporta exatamente assim.

##### Macros tipo função

Macros tipo função substituem cada ocorrência do identificador definido pela replacement-list, adicionalmente recebendo um número de argumentos, que então substituem as ocorrências correspondentes de qualquer um dos parâmetros na replacement-list.

A sintaxe de uma invocação de macro tipo função é semelhante à sintaxe de uma chamada de função: cada instância do nome da macro seguida por um ( como o próximo token de pré-processamento introduz a sequência de tokens que é substituída pela replacement-list. A sequência é terminada pelo token ) correspondente, ignorando pares correspondentes de parênteses esquerdo e direito intermediários.

Para a versão (2), o número de argumentos deve ser o mesmo que o número de parâmetros na definição da macro. Para as versões (3,4), o número de argumentos não deve ser menor que o número de parâmetros (não (desde C++20) contando `...`). Caso contrário, o programa é malformado. Se o identificador não estiver em notação funcional, ou seja, não tiver parênteses depois de si, ele não é substituído de forma alguma.

A versão (2) da diretiva #define define uma macro tipo função simples.

A versão (3) da diretiva #define define uma macro tipo função com número variável de argumentos. Os argumentos adicionais (chamados _argumentos variáveis_) podem ser acessados usando o identificador `__VA_ARGS__`, que é então substituído pelos argumentos fornecidos com o identificador a ser substituído.

A versão (4) da diretiva #define define uma macro tipo função com número variável de argumentos, mas sem argumentos regulares. Os argumentos (chamados _argumentos variáveis_) podem ser acessados apenas com o identificador `__VA_ARGS__`, que é então substituído pelos argumentos fornecidos com o identificador a ser substituído.

Para as versões (3,4), a replacement-list pode conter a sequência de tokens `__VA_OPT__(` content ﻿`)`, que é substituída por content se `__VA_ARGS__` não for vazio, e expande para nada caso contrário.
```cpp
    #define F(...) f(0 __VA_OPT__(,) __VA_ARGS__)
    F(a, b, c) // replaced by f(0, a, b, c)
    F()        // replaced by f(0)
     
    #define G(X, ...) f(0, X __VA_OPT__(,) __VA_ARGS__)
    G(a, b, c) // replaced by f(0, a, b, c)
    G(a, )     // replaced by f(0, a)
    G(a)       // replaced by f(0, a)
     
    #define SDEF(sname, ...) S sname __VA_OPT__(= { __VA_ARGS__ })
    SDEF(foo);       // replaced by S foo;
    SDEF(bar, 1, 2); // replaced by S bar = { 1, 2 };
```

| (desde C++20)

Nota: se um argumento de uma macro tipo função incluir vírgulas que não são protegidas por pares correspondentes de parênteses esquerdo e direito (mais comumente encontrados em listas de argumentos de template, como em [assert](<#/doc/error/assert>)([std::is_same_v](<#/doc/types/is_same>)<int, int>); ou BOOST_FOREACH([std::pair](<#/doc/utility/pair>)<int, int> p, m)), a vírgula é interpretada como separador de argumento de macro, causando uma falha de compilação devido à incompatibilidade na contagem de argumentos.

##### Varredura e Substituição

  * A varredura rastreia as macros que substituíram. Se a varredura encontrar texto que corresponda a tal macro, ela o marca "para ser ignorado" (todas as varreduras o ignorarão). Isso evita a recursão.
  * Se a varredura encontrou uma macro tipo função, os argumentos são varridos antes de serem colocados dentro da replacement-list. Exceto os operadores # e ## que recebem o argumento sem varredura.
  * Após a macro ser substituída, o texto resultante é varrido.

Nota, é possível definir uma macro pseudo-recursiva:

Execute este código
```cpp
    #define EMPTY
    #define SCAN(x)     x
    #define EXAMPLE_()  EXAMPLE
    #define EXAMPLE(n)  EXAMPLE_ EMPTY()(n-1) (n)
    EXAMPLE(5)
    SCAN(EXAMPLE(5))
```

Saída:
```
    EXAMPLE_ ()(5 -1) (5)
    EXAMPLE_ ()(5 -1 -1) (5 -1) (5)
```

#### Nomes de macro reservados

Uma unidade de tradução que [inclui um header da biblioteca padrão](<#/doc/standard_library>) não pode #define ou #undef nomes declarados em qualquer [header da biblioteca padrão](<#/doc/headers>).

Uma unidade de tradução que usa qualquer parte da biblioteca padrão não tem permissão para #define ou #undef nomes lexicalmente idênticos a:

  * [palavras-chave](<#/doc/keywords>)

  * [identificadores com significado especial](<#/doc/keywords>)
  * [qualquer token de atributo padrão](<#/doc/language/attributes>), exceto que [`likely`](<#/doc/language/attributes/likely>) e [`unlikely`](<#/doc/language/attributes/likely>) podem ser definidos como macros tipo função (desde C++20)

| (desde C++11)

Caso contrário, o comportamento é indefinido.

#### Operadores # e ##

Em macros tipo função, um operador # antes de um identificador na replacement-list executa a substituição de parâmetro no identificador e envolve o resultado em aspas, criando efetivamente um literal de string. Além disso, o pré-processador adiciona barras invertidas para escapar as aspas que cercam literais de string embutidos, se houver, e duplica as barras invertidas dentro da string conforme necessário. Todo o espaço em branco inicial e final é removido, e qualquer sequência de espaço em branco no meio do texto (mas não dentro de literais de string embutidos) é colapsada para um único espaço. Esta operação é chamada de "stringificação". Se o resultado da stringificação não for um literal de string válido, o comportamento é indefinido.

Quando # aparece antes de `__VA_ARGS__`, todo o `__VA_ARGS__` expandido é envolvido em aspas:
```cpp
    #define showlist(...) puts(#__VA_ARGS__)
    showlist();            // expands to puts("")
    showlist(1, "x", int); // expands to puts("1, \"x\", int")
```

| (desde C++11)

Um operador ## entre quaisquer dois identificadores sucessivos na replacement-list executa a substituição de parâmetro nos dois identificadores (que não são expandidos por macro primeiro) e então concatena o resultado. Esta operação é chamada de "concatenação" ou "colagem de tokens". Apenas tokens que formam um token válido juntos podem ser colados: identificadores que formam um identificador mais longo, dígitos que formam um número, ou operadores `+` e `=` que formam um `+=`. Um comentário não pode ser criado colando `/` e `*` porque os comentários são removidos do texto antes que a substituição de macro seja considerada. Se o resultado da concatenação não for um token válido, o comportamento é indefinido.

Nota: alguns compiladores oferecem uma extensão que permite que ## apareça após uma vírgula e antes de `__VA_ARGS__`, caso em que o ## não faz nada quando os argumentos variáveis estão presentes, mas remove a vírgula quando os argumentos variáveis não estão presentes: isso torna possível definir macros como fprintf (stderr, format, ##__VA_ARGS__). Isso também pode ser alcançado de maneira padrão usando `__VA_OPT__`, como fprintf (stderr, format __VA_OPT__(, ) __VA_ARGS__). (desde C++20)

#### Diretiva #undef

A diretiva #undef desdefine o identificador, ou seja, cancela a definição anterior do identificador pela diretiva #define. Se o identificador não tiver uma macro associada, a diretiva é ignorada.

### Macros predefinidas

Os seguintes nomes de macro são predefinidos em cada unidade de tradução:

__cplusplus | denota a versão do padrão C++ que está sendo usada, expande para o valor

  * 199711L(até C++11),
  * 201103L(C++11),
  * 201402L(C++14),
  * 201703L(C++17),
  * 202002L(C++20), ou
  * 202302L(C++23)
(constante de macro)

__STDC_HOSTED__(C++11) | expande para a constante inteira 1 se a implementação for hosted (executa sob um SO), ​0​ se freestanding (executa sem um SO)
(constante de macro)
__FILE__ | expande para o nome do arquivo atual, como um literal de string de caractere, pode ser alterado pela diretiva [`#line`](<#/doc/preprocessor/line>)
(constante de macro)
__LINE__ | expande para o número da linha da [linha de código fonte física](<#/doc/language/translation_phases>) atual, uma constante inteira, pode ser alterado pela diretiva [`#line`](<#/doc/preprocessor/line>)
(constante de macro)
__DATE__ | expande para a data da tradução, um literal de string de caractere na forma "Mmm dd yyyy". O primeiro caractere de "dd" é um espaço se o dia do mês for menor que 10. O nome do mês é como se gerado por [std::asctime](<#/doc/chrono/c/asctime>)()
(constante de macro)
__TIME__ | expande para a hora da tradução, um literal de string de caractere na forma "hh:mm:ss"
(constante de macro)
__STDCPP_DEFAULT_NEW_ALIGNMENT__(C++17) | expande para um literal [std::size_t](<#/doc/types/size_t>) cujo valor é o alinhamento garantido por uma chamada a [operator new](<#/doc/memory/new/operator_new>) que não considera alinhamento (alinhamentos maiores serão passados para a sobrecarga que considera alinhamento, como [operator new](<#/doc/memory/new/operator_new>)([std::size_t](<#/doc/types/size_t>), [std::align_val_t](<#/doc/memory/new/align_val_t>)))
(constante de macro)
__STDCPP_­BFLOAT16_­T____STDCPP_­FLOAT16_­T____STDCPP_FLOAT32_T____STDCPP_FLOAT64_T____STDCPP_FLOAT128_T__(C++23) | expande para 1 se e somente se a implementação suportar o [tipo de ponto flutuante estendido](<#/doc/types/floating-point>) correspondente
(constante de macro)

Os seguintes nomes de macro adicionais podem ser predefinidos pelas implementações:

__STDC__ | valor definido pela implementação, se presente, tipicamente usado para indicar conformidade C
(constante de macro)
__STDC_VERSION__(C++11) | valor definido pela implementação, se presente
(constante de macro)
__STDC_ISO_10646__(C++11) | | expande para uma constante inteira na forma yyyymmL, se wchar_t usa Unicode, a data indica a revisão mais recente do Unicode suportada | (até C++23)
valor definido pela implementação, se presente | (desde C++23)

(constante de macro)
__STDC_MB_MIGHT_NEQ_WC__(C++11) | expande para 1 se 'x' == L'x' puder ser falso para um membro do conjunto de caracteres básico, como em sistemas baseados em EBCDIC que usam Unicode para wchar_t
(constante de macro)
__STDCPP_THREADS__(C++11) | expande para 1 se o programa puder ter mais de um thread de execução
(constante de macro)
__STDCPP_STRICT_POINTER_SAFETY__(C++11)(removido em C++23) | expande para 1 se a implementação tiver [std::pointer_safety](<#/doc/memory/gc/pointer_safety>) estrito
(constante de macro)

Os valores dessas macros (exceto para `__FILE__` e `__LINE__`) permanecem constantes em toda a unidade de tradução. Tentativas de redefinir ou desdefinir essas macros resultam em comportamento indefinido.

#### Macros de teste de recursos da linguagem

O padrão define um conjunto de macros de pré-processador correspondentes a recursos da linguagem C++ introduzidos em C++11 ou posterior. Elas são destinadas a ser uma maneira simples e portátil de detectar a presença de tais recursos. Veja [Teste de recursos](<#/doc/feature_test>) para detalhes. | (desde C++20)

### Notas

A [variável predefinida local de função __func__](<#/doc/language/function>) não é uma macro predefinida, mas é geralmente usada em conjunto com __FILE__ e __LINE__, por exemplo, por [assert](<#/doc/error/assert>). | (desde C++11)

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    // Cria uma fábrica de funções e a usa
    #define FUNCTION(name, a) int fun_##name() { return a; }
     
    FUNCTION(abcd, 12)
    FUNCTION(fff, 2)
    FUNCTION(qqq, 23)
     
    #undef FUNCTION
    #define FUNCTION 34
    #define OUTPUT(a) std::cout << "output: " #a << '\n'
     
    // Usando uma macro na definição de uma macro posterior
    #define WORD "Hello "
    #define OUTER(...) WORD #__VA_ARGS__
     
    int main()
    {
        std::cout << "abcd: " << fun_abcd() << '\n';
        std::cout << "fff: " << fun_fff() << '\n';
        std::cout << "qqq: " << fun_qqq() << '\n';
     
        std::cout << FUNCTION << '\n';
        OUTPUT(million); //observe a falta de aspas
     
        std::cout << OUTER(World) << '\n';
        std::cout << OUTER(WORD World) << '\n';
    }
```

Saída:
```
    abcd: 12
    fff: 2
    qqq: 23
    34
    output: million
    Hello World
    Hello WORD World
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2908](<https://cplusplus.github.io/CWG/issues/2908.html>) | C++98 | não estava claro se `__LINE__` expandia para o número da linha física atual ou o número da linha lógica atual | expande para o número da linha física atual
[LWG 294](<https://cplusplus.github.io/LWG/issue294>) | C++98 | uma unidade de tradução que inclui um header da biblioteca padrão poderia conter macros que definem nomes declarados em outros headers da biblioteca padrão | proibido
[P2621R2](<https://wg21.link/P2621R2>) | C++23 | nomes de caracteres universais não eram permitidos serem formados por concatenação de tokens | permitido

### Veja também

[Documentação C++](<#/>) para Índice de Símbolos de Macro
---
[Documentação C](<#/>) para Substituindo macros de texto