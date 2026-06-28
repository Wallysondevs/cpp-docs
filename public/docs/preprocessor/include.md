# Inclusão de arquivo fonte

Inclui outro arquivo fonte no arquivo fonte atual na linha imediatamente após a diretiva.

### Sintaxe

---
`#include <` h-char-sequence `>` new-line | (1) |
---|---|---
`#include "` q-char-sequence `"` new-line | (2) |
`#include` pp-tokens new-line | (3) |
`__has_include` `(` `"` q-char-sequence `"` `)`
`__has_include` `(` `<` h-char-sequence `>` `)` | (4) | (desde C++17)
`__has_include` `(` string-literal `)`
`__has_include` `(` `<` h-pp-tokens `>` `)` | (5) | (desde C++17)

1) Procura por um header identificado unicamente por h-char-sequence e substitui a diretiva por todo o conteúdo do header.

2) Procura por um arquivo fonte identificado por q-char-sequence e substitui a diretiva por todo o conteúdo do arquivo fonte. Pode recorrer a (1) e tratar q-char-sequence como um identificador de header.

3) Se nem (1) nem (2) forem correspondidos, pp-tokens passará por substituição de macro. A diretiva após a substituição será tentada novamente para corresponder a (1) ou (2).

4) Verifica se um header ou arquivo fonte está disponível para inclusão.

5) Se (4) não for correspondido, h-pp-tokens passará por substituição de macro. A diretiva após a substituição será tentada novamente para corresponder a (4).

- **new-line** — O caractere de nova linha
- **h-char-sequence** — Uma sequência de um ou mais h-chars, onde a aparição de qualquer um dos seguintes é condicionalmente suportada com semântica definida pela implementação:

  * o caractere '
  * o caractere "
  * o caractere \
  * a sequência de caracteres //
  * a sequência de caracteres /*

- **h-char** — Qualquer membro do [conjunto de caracteres fonte](<#/doc/language/translation_phases>)(até C++23)[conjunto de caracteres de tradução](<#/doc/language/charset>)(desde C++23) exceto new-line e >
- **q-char-sequence** — Uma sequência de um ou mais q-chars, onde a aparição de qualquer um dos seguintes é condicionalmente suportada com semântica definida pela implementação:

  * o caractere '
  * o caractere \
  * a sequência de caracteres //
  * a sequência de caracteres /*

- **q-char** — Qualquer membro do [conjunto de caracteres fonte](<#/doc/language/translation_phases>)(até C++23)[conjunto de caracteres de tradução](<#/doc/language/charset>)(desde C++23) exceto new-line e "
- **pp-tokens** — Uma sequência de um ou mais [tokens de pré-processamento](<#/doc/language/translation_phases>)
- **string-literal** — Um [literal de string](<#/doc/language/string_literal>)
- **h-pp-tokens** — Uma sequência de um ou mais [tokens de pré-processamento](<#/doc/language/translation_phases>) exceto >

### Explicação

1) Procura em uma sequência de locais definidos pela implementação por um header identificado unicamente por h-char-sequence, e causa a substituição dessa diretiva por todo o conteúdo do header. Como os locais são especificados ou o header é identificado é definido pela implementação.

2) Causa a substituição dessa diretiva por todo o conteúdo do arquivo fonte identificado por q-char-sequence. O arquivo fonte nomeado é procurado de uma maneira definida pela implementação. Se esta busca não for suportada, ou se a busca falhar, a diretiva é reprocessada como se lesse a sintaxe (1) com a sequência contida idêntica (incluindo caracteres > , se houver) da diretiva original.

3) Os tokens de pré-processamento após `include` na diretiva são processados assim como em texto normal (ou seja, cada identificador atualmente definido como um nome de macro é substituído por sua lista de substituição de tokens de pré-processamento). Se a diretiva resultante após todas as substituições não corresponder a uma das duas formas anteriores, o comportamento é indefinido. O método pelo qual uma sequência de tokens de pré-processamento entre um par de tokens de pré-processamento < e > ou um par de caracteres " é combinada em um único token de pré-processamento de nome de header é definido pela implementação.

4) O header ou arquivo fonte identificado por h-char-sequence ou q-char-sequence é procurado como se essa sequência de tokens de pré-processamento fossem os pp-tokens na sintaxe (3), exceto que nenhuma expansão de macro adicional é realizada. Se tal diretiva não satisfizer os requisitos sintáticos de uma diretiva `#include`, o programa é malformado. A expressão `__has_include` avalia para 1 se a busca pelo arquivo fonte for bem-sucedida, e para 0 se a busca falhar.

5) Esta forma é considerada apenas se a sintaxe (4) não corresponder, caso em que os tokens de pré-processamento são processados assim como em texto normal.

Se o header identificado pelo header-name (ou seja, `<` h-char-sequence `>` ou `"` q-char-sequence `"`) denota um header importável, é definido pela implementação se a diretiva de pré-processamento `#include` é substituída por uma [diretiva de importação](<#/doc/language/modules>) da forma `import` header-name `;` new-line | (desde C++20)

`__has_include` pode ser expandido na expressão de [` #if`](<#/doc/preprocessor/conditional>) e [` #elif`](<#/doc/preprocessor/conditional>). É tratado como uma macro definida por [` #ifdef`](<#/doc/preprocessor/conditional>), [` #ifndef`](<#/doc/preprocessor/conditional>), [` #elifdef`](<#/doc/preprocessor/conditional>), [` #elifndef`](<#/doc/preprocessor/conditional>)(desde C++23) e [`defined`](<#/doc/preprocessor/conditional>), mas não pode ser usado em nenhum outro lugar.

### Notas

Implementações típicas procuram apenas em diretórios de inclusão padrão para a sintaxe (1). A biblioteca padrão C++ e a biblioteca padrão C são implicitamente incluídas nesses diretórios de inclusão padrão. Os diretórios de inclusão padrão geralmente podem ser controlados pelo usuário através de opções do compilador.

A intenção da sintaxe (2) é procurar pelos arquivos que não são controlados pela implementação. Implementações típicas primeiro procuram no diretório onde o arquivo atual reside e depois recorrem a (1).

Quando um arquivo é incluído, ele é processado pelas [fases de tradução](<#/doc/language/translation_phases>) 1-4, o que pode incluir, recursivamente, a expansão das diretivas `#include` aninhadas, até um limite de aninhamento definido pela implementação. Para evitar a inclusão repetida do mesmo arquivo e recursão infinita quando um arquivo se inclui, talvez transitivamente, _header guards_ são comumente usados: o header inteiro é envolvido em
```cpp
    #ifndef FOO_H_INCLUDED /* any name uniquely mapped to file name */
    #define FOO_H_INCLUDED
    // contents of the file are here
    #endif
```

Muitos compiladores também implementam o [`pragma`](<#/doc/preprocessor/impl>) #pragma once não padrão com efeitos semelhantes: ele desabilita o processamento de um arquivo se o mesmo arquivo (onde a identidade do arquivo é determinada de forma específica do SO) já tiver sido incluído.

Uma sequência de caracteres que se assemelha a uma sequência de escape em q-char-sequence ou h-char-sequence pode resultar em um erro, ser interpretada como o caractere correspondente à sequência de escape, ou ter um significado completamente diferente, dependendo da implementação.

Um resultado de `__has_include` igual a 1 significa apenas que um header ou arquivo fonte com o nome especificado existe. Não significa que o header ou arquivo fonte, quando incluído, não causaria um erro ou conteria algo útil. Por exemplo, em uma implementação C++ que suporta os modos C++14 e C++17 (e fornece __has_include em seu modo C++14 como uma extensão conforme), __has_include(&lt;optional&gt;) pode ser 1 no modo C++14, mas na verdade #include &lt;optional&gt; pode causar um erro.

### Exemplo

Execute este código
```cpp
    #if __has_include(<optional>)
        #include <optional>
        #define has_optional 1
        template<class T>
        using optional_t = std::optional<T>;
    #elif __has_include(<experimental/optional>)
        #include <experimental/optional>
        #define has_optional -1
        template<class T>
        using optional_t = std::experimental::optional<T>;
    #else
        #define has_optional 0
        template<class V>
        class optional_t
        {
            V v{};
            bool has{};
    
        public:
            optional_t() = default;
            optional_t(V&& v) : v(v), has{true} {}
            V value_or(V&& alt) const&
            {
                return has ? v : alt;
            }
            // etc.
        };
    #endif
    
    #include <iostream>
    
    int main()
    {
        if (has_optional > 0)
            std::cout << "<optional> is present\n";
        else if (has_optional < 0)
            std::cout << "<experimental/optional> is present\n";
        else
            std::cout << "<optional> is not present\n";
    
        optional_t<int> op;
        std::cout << "op = " << op.value_or(-1) << '\n';
        op = 42;
        std::cout << "op = " << op.value_or(-1) << '\n';
    }
```

Saída:
```
    <optional> is present
    op = -1
    op = 42
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 787](<https://cplusplus.github.io/CWG/issues/787.html>) | C++98 | o comportamento é indefinido se uma sequência de escape for assemelhada em q-char-sequence ou h-char-sequence | é condicionalmente suportado

### Veja também

[Uma lista de arquivos de header da Biblioteca Padrão C++](<#/doc/headers>)
---
[Documentação C](<#/>) para inclusão de arquivo fonte