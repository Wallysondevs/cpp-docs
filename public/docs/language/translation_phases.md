# Fases de tradução

Arquivos fonte C++ são processados pelo compilador para produzir programas C++.

### Processo de tradução

O texto de um programa C++ é mantido em unidades chamadas _arquivos fonte_.

Arquivos fonte C++ passam por _tradução_ para se tornarem uma _unidade de tradução_, consistindo nos seguintes passos:

1.  Mapeia cada arquivo fonte para uma sequência de caracteres.
2.  Converte cada sequência de caracteres para uma sequência de tokens de pré-processamento, separada por whitespace.
3.  Converte cada token de pré-processamento para um token, formando uma sequência de tokens.
4.  Converte cada sequência de tokens para uma unidade de tradução.

Um programa C++ pode ser formado a partir de unidades de tradução traduzidas. Unidades de tradução podem ser traduzidas separadamente e então posteriormente linkadas para produzir um programa executável.

O processo acima pode ser organizado em 9 [fases de tradução](<#/doc/language/translation_phases>).

### Tokens de pré-processamento

Um _token de pré-processamento_ é o elemento léxico mínimo da linguagem nas fases de tradução 3 a 6.

As categorias de token de pré-processamento são:

*   [nomes de cabeçalho](<#/doc/preprocessor/include>) (como &lt;iostream&gt; ou "myfile.h")

*   tokens de placeholder produzidos por [diretivas de importação e módulo](<#/doc/language/modules>) de pré-processamento (ou seja, import XXX; e module XXX;)

| (desde C++20)
*   [identificadores](<#/doc/language/name>)
*   números de pré-processamento (veja abaixo)
*   [literais de caractere](<#/doc/language/character_literal>), incluindo literais de caractere [definidos pelo usuário](<#/doc/language/user_literal>) (desde C++11)
*   [literais de string](<#/doc/language/string_literal>), incluindo literais de string [definidos pelo usuário](<#/doc/language/user_literal>) (desde C++11)
*   [operadores e pontuadores](<#/doc/language/punctuators>), incluindo [tokens alternativos](<#/doc/language/operator_alternative>)
*   caracteres individuais não-whitespace que não se encaixam em nenhuma outra categoria

    O programa é malformado se o caractere que corresponde a esta categoria for

*   apóstrofo (', U+0027),
*   aspas (", U+0022), ou
*   um caractere que não está no [conjunto de caracteres básico](<#/doc/language/charset>).

#### Números de pré-processamento

O conjunto de tokens de pré-processamento de número de pré-processamento é um superconjunto da união dos conjuntos de tokens de [literais inteiros](<#/doc/language/integer_literal>) e [literais de ponto flutuante](<#/doc/language/floating_literal>):

---
`.`(opcional) digit pp-continue-seq ﻿(opcional)
digit | \- | um dos dígitos 0-9
---|---|---
pp-continue-seq | \- | uma sequência de pp-continue ﻿s

Cada pp-continue é um dos seguintes:

---
identifier-continue | (1) |
---|---|---
exp-char sign-char | (2) |
`.` | (3) |
`’` digit | (4) | (desde C++14)
`’` nondigit | (5) | (desde C++14)
identifier-continue | \- | qualquer caractere não-inicial de um [identificador](<#/doc/language/name>) válido
exp-char | \- | um de `P`, `p`, (desde C++11) `E` e `e`
sign-char | \- | um de `+` e `-`
digit | \- | um dos dígitos 0-9
nondigit | \- | uma das letras latinas A/a-Z/z e sublinhado

Um número de pré-processamento não possui um tipo ou um valor; ele adquire ambos após uma conversão bem-sucedida para um token literal inteiro/de ponto flutuante.

#### Whitespace

_Whitespace_ consiste em [comentários](<#/doc/comments>), caracteres whitespace, ou ambos.

Os seguintes caracteres são caracteres whitespace:

*   tabulação de caractere (U+0009)
*   avanço de linha / caractere de nova linha (U+000A)
*   tabulação de linha (U+000B)
*   avanço de formulário (U+000C)
*   espaço (U+0020)

Whitespace é geralmente usado para separar tokens de pré-processamento, com as seguintes exceções:

*   Não é um separador em nome de cabeçalho, literal de caractere e literal de string.
*   Tokens de pré-processamento separados por whitespace contendo caracteres de nova linha não podem formar [diretivas de pré-processamento](<#/doc/preprocessor>).

```cpp
    #include "my header"        // OK, usando um nome de cabeçalho contendo whitespace
    
    #include/*hello*/<iostream> // OK, usando um comentário como whitespace
    
    #include
    <iostream> // Erro: #include não pode se estender por múltiplas linhas
    
    "str ing"  // OK, um único token de pré-processamento (literal de string)
    ' '        // OK, um único token de pré-processamento (literal de caractere)
```

#### Maximal munch

Se a entrada foi analisada em tokens de pré-processamento até um determinado caractere, o próximo token de pré-processamento é geralmente considerado a sequência mais longa de caracteres que poderia constituir um token de pré-processamento, mesmo que isso causasse a falha da análise subsequente. Isso é comumente conhecido como _maximal munch_.
```cpp
    int foo = 1;
    int bar = 0xE+foo;   // Erro: número de pré-processamento inválido 0xE+foo
    int baz = 0xE + foo; // OK
```

Em outras palavras, a regra maximal munch favorece [operadores e pontuadores multi-caractere](<#/doc/language/punctuators>):
```cpp
    int foo = 1;
    int bar = 2;
    
    int num1 = foo+++++bar; // Erro: tratado como “foo++ ++ +baz”, não “foo++ + ++baz”
    int num2 = -----foo;    // Erro: tratado como “-- -- -foo”, não “- -- --foo”
```

A regra maximal munch possui as seguintes exceções:

*   Tokens de pré-processamento de nome de cabeçalho são formados apenas nos seguintes casos:

    *   após o token de pré-processamento include em uma diretiva [#include](<#/doc/preprocessor/include>)

    *   em uma expressão [`__has_include`](<#/doc/preprocessor/include>)

| (desde C++17)
    *   após o token de pré-processamento import em uma diretiva [import](<#/doc/language/modules>)

| (desde C++20)
```cpp
    std::vector<int> x; // OK, “int” não é um nome de cabeçalho
```
*   Se os próximos três caracteres forem <:: e o caractere subsequente não for : nem >, o < é tratado como um token de pré-processamento por si só, em vez do primeiro caractere do [token alternativo](<#/doc/language/operator_alternative>) <:.

```cpp
    struct Foo { static const int v = 1; };
    std::vector<::Foo> x;  // OK, <: não é considerado o token alternativo para [
    extern int y<::>;      // OK, o mesmo que “extern int y[];”
    int z<:::Foo::value:>; // OK, o mesmo que “int z[::Foo::value];”
```

*   Se os próximos dois caracteres forem >> e um dos caracteres > puder completar um [identificador de template](<#/doc/language/templates>), o caractere é tratado como um token de pré-processamento sozinho, em vez de fazer parte do token de pré-processamento >>.

```cpp
    template<int i> class X { /* ... */ };
    template<class T> class Y { /* ... */ };
    
    Y<X<1>> x3;      // OK, declara uma variável “x3” do tipo “Y<X<1> >”
    Y<X<6>>1>> x4;   // Erro de sintaxe
    Y<X<(6>>1)>> x5; // OK
```

*   Se o próximo caractere iniciar uma sequência de caracteres que poderia ser o prefixo e as aspas duplas iniciais de um [literal de string raw](<#/doc/language/string_literal>), o próximo token de pré-processamento é um literal de string raw. O literal consiste na sequência mais curta de caracteres que corresponde ao padrão de string raw.

```cpp
    #define R "x"
    const char* s = R"y";         // literal de string raw malformado, não "x" "y"
    const char* s2 = R"(a)" "b)"; // um literal de string raw seguido por um literal de string normal
```

| (desde C++11)

### Tokens

Um _token_ é o elemento léxico mínimo da linguagem na fase de tradução 7.

As categorias de token são:

*   [identificadores](<#/doc/language/name>)
*   [palavras-chave](<#/doc/keywords>)
*   [literais](<#/doc/language/expressions>)
*   [operadores e pontuadores](<#/doc/language/punctuators>) (exceto operadores de pré-processamento)

### Fases de tradução

A tradução é realizada [como se](<#/doc/language/as_if>) na ordem da fase 1 à fase 9. As implementações se comportam como se essas fases separadas ocorressem, embora na prática diferentes fases possam ser combinadas.

#### Fase 1: Mapeamento de caracteres fonte

1) Os bytes individuais do arquivo de código fonte são mapeados (de maneira definida pela implementação) para os caracteres do [conjunto de caracteres fonte básico](<#/doc/language/charset>). Em particular, indicadores de fim de linha dependentes do sistema operacional são substituídos por caracteres de nova linha. 2) O conjunto de caracteres de arquivo fonte aceitos é definido pela implementação (desde C++11). Qualquer caractere de arquivo fonte que não possa ser mapeado para um caractere no [conjunto de caracteres fonte básico](<#/doc/language/charset>) é substituído por seu [nome de caractere universal](<#/doc/language/escape>) (escapado com `\u` ou `\U`) ou por alguma forma definida pela implementação que é tratada de forma equivalente. | 3) [Sequências de trigrafos](<#/doc/language/operator_alternative>) são substituídas por representações de caractere único correspondentes. | (até C++17)
(até C++23)
Arquivos de entrada que são uma sequência de unidades de código UTF-8 (arquivos UTF-8) têm suporte garantido. O conjunto de outros tipos de arquivos de entrada suportados é definido pela implementação. Se o conjunto não for vazio, o tipo de um arquivo de entrada é determinado de uma maneira definida pela implementação que inclui um meio de designar arquivos de entrada como arquivos UTF-8, independentemente de seu conteúdo (reconhecer a marca de ordem de byte não é suficiente).

*   Se um arquivo de entrada for determinado como um arquivo UTF-8, então ele deverá ser uma sequência de unidades de código UTF-8 bem formada e será decodificado para produzir uma sequência de valores escalares Unicode. Uma sequência de elementos do [conjunto de caracteres de tradução](<#/doc/language/charset>) é então formada mapeando cada valor escalar Unicode para o elemento correspondente do conjunto de caracteres de tradução. Na sequência resultante, cada par de caracteres na sequência de entrada consistindo de retorno de carro (U+000D) seguido por avanço de linha (U+000A), bem como cada retorno de carro (U+000D) não imediatamente seguido por um avanço de linha (U+000A), é substituído por um único caractere de nova linha.
*   Para qualquer outro tipo de arquivo de entrada suportado pela implementação, os caracteres são mapeados (de maneira definida pela implementação) para uma sequência de elementos do conjunto de caracteres de tradução. Em particular, indicadores de fim de linha dependentes do sistema operacional são substituídos por caracteres de nova linha.

| (desde C++23)

#### Fase 2: Emenda de linhas

1) Se o primeiro caractere de tradução for a marca de ordem de byte (U+FEFF), ele é excluído. (desde C++23) Sempre que uma barra invertida (\) aparece no final de uma linha (imediatamente seguida por zero ou mais caracteres whitespace que não sejam de nova linha, seguidos por (desde C++23) o caractere de nova linha), esses caracteres são excluídos, combinando duas linhas fonte físicas em uma linha fonte lógica. Esta é uma operação de passagem única; uma linha terminando em duas barras invertidas seguida por uma linha vazia não combina três linhas em uma.

2) Se um arquivo fonte não vazio não terminar com um caractere de nova linha após esta etapa (barras invertidas de fim de linha não são mais emendas neste ponto), um caractere de nova linha de terminação é adicionado.

#### Fase 3: Análise léxica

1) O arquivo fonte é decomposto em [tokens de pré-processamento](<#/doc/language/translation_phases>) e [whitespace](<#/doc/language/translation_phases>):
```cpp
    // A seguinte diretiva #include pode ser decomposta em 5 tokens de pré-processamento:
    
    //     pontuadores (#, < e >)
    //          │
    // ┌────────┼────────┐
    // │        │        │
       #include <iostream>
    //     │        │
    //     │        └── nome de cabeçalho (iostream)
    //     │
    //     └─────────── identificador (include)
```

Se um arquivo fonte terminar em um token de pré-processamento parcial ou em um comentário parcial, o programa é malformado:
```cpp
    // Erro: literal de string parcial
    "abc
```
```cpp
    // Erro: comentário parcial
    /* comment
```

À medida que os caracteres do arquivo fonte são consumidos para formar o próximo token de pré-processamento (ou seja, não sendo consumidos como parte de um comentário ou outras formas de whitespace), nomes de caracteres universais são reconhecidos e substituídos pelo elemento designado do [conjunto de caracteres de tradução](<#/doc/language/charset>), exceto ao corresponder a uma sequência de caracteres em um dos seguintes tokens de pré-processamento:

*   um literal de caractere (c-char-sequence)
*   um literal de string (s-char-sequence e r-char-sequence), excluindo delimitadores (d-char-sequence)
*   um nome de cabeçalho (h-char-sequence e q-char-sequence)

| (desde C++23)

2) Quaisquer transformações realizadas durante a fase 1 e (até C++23) fase 2 entre as aspas duplas inicial e final de qualquer [literal de string raw](<#/doc/language/string_literal>) são revertidas. | (desde C++11)

3) Whitespace é transformado:

*   Cada comentário é substituído por um caractere de espaço.
*   Caracteres de nova linha são mantidos.
*   Se cada sequência não vazia de caracteres whitespace que não sejam de nova linha é mantida ou substituída por um caractere de espaço é não especificado.

#### Fase 4: Pré-processamento

1) O [pré-processador](<#/doc/preprocessor>) é executado.

2) Cada arquivo introduzido com a diretiva [#include](<#/doc/preprocessor/include>) passa pelas fases 1 a 4, recursivamente.

3) Ao final desta fase, todas as diretivas de pré-processador são removidas do código fonte.

#### Fase 5: Determinando codificações comuns de literais de string

1) Todos os caracteres em [literais de caractere](<#/doc/language/character_literal>) e [literais de string](<#/doc/language/string_literal>) são convertidos do conjunto de caracteres fonte para a [codificação](<#/doc/language/charset>) (que pode ser uma codificação de caracteres multibyte como UTF-8, desde que os 96 caracteres do [conjunto de caracteres básico](<#/doc/language/charset>) tenham representações de byte único). 2) [Sequências de escape](<#/doc/language/escape>) e nomes de caracteres universais em literais de caractere e literais de string não-raw são expandidos e convertidos para a codificação literal. Se o caractere especificado por um nome de caractere universal não puder ser codificado como um único ponto de código na codificação literal correspondente, o resultado é definido pela implementação, mas é garantido que não seja um caractere nulo (wide). | (até C++23)
---|---
Para uma sequência de dois ou mais tokens de [literal de string](<#/doc/language/string_literal>) adjacentes, um prefixo de codificação comum é determinado conforme descrito [aqui](<#/doc/language/string_literal>). Cada um desses tokens de literal de string é então considerado como tendo esse prefixo de codificação comum. (A conversão de caracteres é movida para a fase 3) | (desde C++23)

#### Fase 6: Concatenação de literais de string

[Literais de string](<#/doc/language/string_literal>) adjacentes são concatenados.

#### Fase 7: Compilação

A compilação ocorre: cada token de pré-processamento é convertido em um [token](<#/doc/language/translation_phases>). Os tokens são analisados sintática e semanticamente e traduzidos como uma [unidade de tradução](<#/doc/language/translation_phases>).

#### Fase 8: Instanciação de templates

Cada unidade de tradução é examinada para produzir uma lista de instanciações de template necessárias, incluindo aquelas solicitadas por [instanciações explícitas](<#/doc/language/class_template>). As definições dos templates são localizadas, e as instanciações necessárias são realizadas para produzir _unidades de instanciação_.

#### Fase 9: Linkagem

Unidades de tradução, unidades de instanciação e componentes de biblioteca necessários para satisfazer referências externas são coletados em uma imagem de programa que contém as informações necessárias para a execução em seu ambiente de execução.

### Notas

Arquivos fonte, unidades de tradução e unidades de tradução traduzidas não precisam necessariamente ser armazenados como arquivos, nem precisa haver uma correspondência um-para-um entre essas entidades e qualquer representação externa. A descrição é apenas conceitual e não especifica nenhuma implementação particular.

A conversão realizada na fase 5 pode ser controlada por opções de linha de comando em algumas implementações: gcc e clang usam -finput-charset para especificar a codificação do conjunto de caracteres fonte, -fexec-charset e -fwide-exec-charset para especificar as codificações de literais comuns e wide, respectivamente, enquanto o Visual Studio 2015 Update 2 e posterior usa /source-charset e /execution-charset para especificar o conjunto de caracteres fonte e a codificação literal, respectivamente. | (até C++23)

Alguns compiladores não implementam unidades de instanciação (também conhecidas como [repositórios de template](<https://docs.oracle.com/cd/E18659_01/html/821-1383/bkagr.html#scrolltoc>) ou [registros de template](<http://www-01.ibm.com/support/knowledgecenter/SSXVZZ_12.1.0/com.ibm.xlcpp121.linux.doc/compiler_ref/fcat_template.html?lang=en>)) e simplesmente compilam cada instanciação de template na fase 7, armazenando o código no arquivo objeto onde é implicitamente ou explicitamente solicitado, e então o linker colapsa essas instanciações compiladas em uma na fase 9.

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 787](<https://cplusplus.github.io/CWG/issues/787.html>) | C++98 | o comportamento era indefinido se um arquivo fonte não vazio não terminasse com um caractere de nova linha ao final da fase 2 | adicionar um caractere de nova linha de terminação neste caso
[CWG 1104](<https://cplusplus.github.io/CWG/issues/1104.html>) | C++98 | o token alternativo <: fazia com que [std::vector](<#/doc/container/vector>)<::[std::string](<#/doc/string/basic_string>)> fosse tratado como [std::vector](<#/doc/container/vector>)[:[std::string](<#/doc/string/basic_string>)> | adicionada uma regra de análise léxica adicional para tratar este caso
[CWG 1775](<https://cplusplus.github.io/CWG/issues/1775.html>) | C++11 | formar um nome de caractere universal dentro de um literal de string raw na fase 2 resultava em comportamento indefinido | tornou-se bem definido
[CWG 2747](<https://cplusplus.github.io/CWG/issues/2747.html>) | C++98 | a fase 2 verificava a emenda de fim de arquivo após a emenda, isso é desnecessário | removida a verificação
[P2621R3](<https://wg21.link/P2621R3>) | C++98 | nomes de caracteres universais não eram permitidos serem formados por emenda de linha ou concatenação de tokens | permitido

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   5.2 Phases of translation [lex.phases]

*   Padrão C++20 (ISO/IEC 14882:2020):

    *   5.2 Phases of translation [lex.phases]

*   Padrão C++17 (ISO/IEC 14882:2017):

    *   5.2 Phases of translation [lex.phases]

*   Padrão C++14 (ISO/IEC 14882:2014):

    *   2.2 Phases of translation [lex.phases]

*   Padrão C++11 (ISO/IEC 14882:2011):

    *   2.2 Phases of translation [lex.phases]

*   Padrão C++03 (ISO/IEC 14882:2003):

    *   2.1 Phases of translation [lex.phases]

*   Padrão C++98 (ISO/IEC 14882:1998):

    *   2.1 Phases of translation [lex.phases]

### Veja também

[Documentação C](<#/>) para Fases de tradução
---