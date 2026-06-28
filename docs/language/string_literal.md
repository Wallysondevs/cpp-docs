# Literal de string

### Sintaxe

---
`"` s-char-seq (opcional)`"` | (1) |
---|---|---
`R"` d-char-seq (opcional)`(` r-char-seq (opcional)`)` d-char-seq (opcional)`"` | (2) | (desde C++11)
`L"` s-char-seq (opcional)`"` | (3) |
`LR"` d-char-seq (opcional)`(` r-char-seq (opcional)`)` d-char-seq (opcional)`"` | (4) | (desde C++11)
`u8"` s-char-seq (opcional)`"` | (5) | (desde C++11)
`u8R"` d-char-seq (opcional)`(` r-char-seq (opcional)`)` d-char-seq (opcional)`"` | (6) | (desde C++11)
`u"` s-char-seq (opcional)`"` | (7) | (desde C++11)
`uR"` d-char-seq (opcional)`(` r-char-seq (opcional)`)` d-char-seq (opcional)`"` | (8) | (desde C++11)
`U"` s-char-seq (opcional)`"` | (9) | (desde C++11)
`UR"` d-char-seq (opcional)`(` r-char-seq (opcional)`)` d-char-seq (opcional)`"` | (10) | (desde C++11)

### Explicação

- **s-char-seq** — Uma sequência de um ou mais s-char s
- **s-char** — Um de

  * um basic-s-char
  * uma sequência de escape, conforme definido em [sequências de escape](<#/doc/language/escape>)
  * um nome de caractere universal, conforme definido em [sequências de escape](<#/doc/language/escape>)

- **basic-s-char** — Um caractere do [conjunto de caracteres de tradução](<#/doc/language/charset>), exceto as aspas duplas ", barra invertida \, ou caractere de nova linha
- **d-char-seq** — Uma sequência de um ou mais d-char s, com no máximo 16 caracteres de comprimento
- **d-char** — Um caractere do [conjunto de caracteres básico](<#/doc/language/charset>), exceto parênteses, barra invertida e [espaços](<#/doc/string/byte/isspace>)
- **r-char-seq** — Uma sequência de um ou mais r-char s, exceto que não deve conter a sequência de fechamento `)` d-char-seq`"`
- **r-char** — Um caractere do [conjunto de caracteres de tradução](<#/doc/language/charset>)

Sintaxe | Tipo | Tipo | Codificação
---|---|---|---
(1,2) | literal de string comum | const char[N] | [codificação de literal comum](<#/doc/language/charset>)
(3,4) | literal de string wide | const wchar_t[N] | [codificação de literal wide](<#/doc/language/charset>)
(5,6) | literal de string UTF-8 | | const char[N] | (ate C++20)
const char8_t[N] | (desde C++20)
UTF-8
(7,8) | literal de string UTF-16 | const char16_t[N] | UTF-16
---|---|---|---
(9,10) | literal de string UTF-32 | const char32_t[N] | UTF-32

Nos tipos listados na tabela acima, N é o número de unidades de código codificadas, que é determinado [abaixo](<#/doc/language/string_literal>).

Literais de string comuns e UTF-8 (desde C++11) são coletivamente referidos como literais de string narrow.

A avaliação de um literal de string resulta em um objeto literal de string com [duração de armazenamento](<#/doc/language/storage_duration>) estática. Se todos os literais de string são armazenados em [objetos não sobrepostos](<#/doc/language/objects>) e se avaliações sucessivas de um literal de string produzem o mesmo ou um objeto diferente é não especificado.

O efeito de tentar modificar um objeto literal de string é comportamento indefinido.
```cpp
    bool b = "bar" == 3 + "foobar"; // pode ser verdadeiro ou falso, não especificado
    
    const char* pc = "Hello";
    char* p = const_cast<char*>(pc);
    p[0] = 'M'; // comportamento indefinido
```

### Literais de string raw

Literais de string raw são literais de string com um prefixo contendo `R` (sintaxes (2,4,6,8,10)). Eles não escapam nenhum caractere, o que significa que qualquer coisa entre os delimitadores d-char-seq `(` e `)` d-char-seq se torna parte da string. O d-char-seq de terminação é a mesma sequência de caracteres que o d-char-seq inicial.
```cpp
    // OK: contém uma barra invertida,
    // equivalente a "\\"
    R"(\)";
    
    // OK: contém quatro pares \n,
    // equivalente a "\\n\\n\\n\\n"
    R"(\n\n\n\n)";
    
    // OK: contém um parêntese de fechamento, duas aspas duplas e um parêntese de abertura,
    // equivalente a ")\"\"("
    R"-()""()-";
    
    // OK: equivalente a "\n)\\\na\"\"\n"
    R"a(
    )\
    a""
    )a";
    
    // OK: equivalente a "x = \"\"\\y\"\""
    R"(x = ""\y"")";
    
    // R"<<(-_-)>>"; // Erro: delimitadores de início e fim não correspondem
    // R"-()-"-()-"; // Erro: )-" aparece no meio e termina o literal
```

| (desde C++11)

### Inicialização

Objetos literais de string são inicializados com a sequência de valores de unidade de código correspondente à sequência de s-char s e r-char s (desde C++11) do literal de string, mais um caractere nulo de terminação (U+0000), na seguinte ordem:

1) Para cada sequência contígua de basic-s-char s, r-char s (desde C++11), [sequências de escape simples](<#/doc/language/escape>) e [nomes de caracteres universais](<#/doc/language/escape>), a sequência de caracteres que ela denota é codificada em uma sequência de unidades de código usando a codificação de caracteres associada ao literal de string. Se um caractere não tiver representação na codificação de caracteres associada, o programa será malformado.

Se a codificação de caracteres associada for com estado, a primeira sequência é codificada começando com o estado de codificação inicial e cada sequência subsequente é codificada começando com o estado de codificação final da sequência anterior.

2) Para cada [sequência de escape numérica](<#/doc/language/escape>), dado v como o valor inteiro representado pelo número octal ou hexadecimal que compreende a sequência de dígitos na sequência de escape, e `T` como o tipo de elemento do array do literal de string (veja a tabela [acima](<#/doc/language/string_literal>)):

  * Se v não exceder o intervalo de valores representáveis de `T`, então a sequência de escape contribui com uma única unidade de código com valor v.
  * Caso contrário, se o literal de string for da sintaxe (1) ou (3), e (desde C++11) v não exceder o intervalo de valores representáveis do tipo unsigned correspondente para o tipo subjacente de `T`, então a sequência de escape contribui com uma única unidade de código com um valor único do tipo `T`, que é congruente a v mod 2S , onde S é a largura de `T`.
  * Caso contrário, o programa é malformado.

Se a codificação de caracteres associada for com estado, todas essas sequências não têm efeito no estado de codificação.

3) Cada [sequência de escape condicional](<#/doc/language/escape>) contribui com uma sequência de unidades de código definida pela implementação.

Se a codificação de caracteres associada for com estado, é definido pela implementação qual efeito essas sequências têm no estado de codificação.

### Concatenação

Literais de string adjacentes são concatenados na [fase de tradução 6](<#/doc/language/translation_phases>) (após o pré-processamento):

  * Se os dois literais de string forem do mesmo [tipo](<#/doc/language/string_literal>), o literal de string concatenado também será desse tipo.

  * Se um literal de string comum for adjacente a um literal de string wide, o comportamento é indefinido.

| (ate C++11)

  * Se um literal de string comum for adjacente a um literal de string não comum, o literal de string concatenado é do tipo deste último.
  * Se um literal de string UTF-8 for adjacente a um literal de string wide, o programa será malformado.

|

  * Qualquer outra combinação é condicionalmente suportada com semântica definida pela implementação.[1](<#/doc/language/string_literal>)

| (ate C++23)

  * Qualquer outra combinação é malformada.

| (desde C++23)
(desde C++11)
```cpp
    "Hello, " " world!" // na fase 6, os 2 literais de string formam "Hello, world!"
    
    L"Δx = %" PRId16    // na fase 4, PRId16 expande para "d"
                        // na fase 6, L"Δx = %" e "d" formam L"Δx = %d"
```

  1. [↑](<#/doc/language/string_literal>) Nenhuma implementação conhecida suporta tal concatenação.

### Strings não avaliadas

Os seguintes contextos esperam um literal de string, mas não o avaliam:

  * especificação de [language linkage](<#/doc/language/language_linkage>)

  * [`static_assert`](<#/doc/language/static_assert>)
  * nome de [literal operator](<#/doc/language/user_literal>)

| (desde C++11)

  * `[[[deprecated](<#/doc/language/attributes/deprecated>)]]`

| (desde C++14)

  * `[[[nodiscard](<#/doc/language/attributes/nodiscard>)]]`

| (desde C++20)

  * [corpo de função deletada](<#/doc/language/function>)

| (desde C++26)

```cpp
É não especificado se literais de string não comuns são permitidos nesses contextos, exceto que um nome de literal operator deve usar um literal de string comum (desde C++11). | (ate C++26)
Apenas literais de string comuns são permitidos nesses contextos. Cada nome de caractere universal e cada sequência de escape simples em uma string não avaliada é substituído pelo membro do conjunto de caracteres de tradução que ele denota. Uma string não avaliada que contém uma sequência de escape numérica ou uma sequência de escape condicional é malformada.  // (desde C++26)
```

### Notas

Literais de string podem ser usados para [inicializar arrays de caracteres](<#/doc/language/aggregate_initialization>). Se um array for inicializado como char str[] = "foo";, str conterá uma cópia da string "foo".

Literais de string são conversíveis e atribuíveis a char* ou wchar_t* não-const a fim de serem compatíveis com C, onde literais de string são dos tipos char[N] e wchar_t[N]. Tal conversão implícita é depreciada. | (ate C++11)
---|---
Literais de string não são conversíveis ou atribuíveis a `CharT*` não-const. Um cast explícito (por exemplo, [`const_cast`](<#/doc/language/const_cast>)) deve ser usado se tal conversão for desejada. | (desde C++11)

Um literal de string não é necessariamente uma sequência de caracteres terminada em nulo: se um literal de string tiver caracteres nulos embutidos, ele representa um array que contém mais de uma string.
```cpp
    const char* p = "abc\0def"; // std::strlen(p) == 3, mas o array tem tamanho 8
```

Se um dígito hexadecimal válido seguir uma sequência de escape hexadecimal em um literal de string, ele falharia na compilação como uma sequência de escape inválida. A concatenação de strings pode ser usada como uma solução alternativa:
```cpp
    //const char* p = "\xfff"; // erro: sequência de escape hexadecimal fora do intervalo
    const char* p = "\xff""f"; // OK: o literal é const char[3] contendo {'\xff','f','\0'}
```

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_char8_t`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Correção de compatibilidade e portabilidade de char8_t (permite [inicialização de arrays de char (unsigned)](<#/doc/language/aggregate_initialization>) a partir de literais de string UTF-8)
[`__cpp_raw_strings`](<#/doc/feature_test>) | [`200710L`](<#/>) | (C++11) | Literais de string raw
[`__cpp_unicode_literals`](<#/doc/feature_test>) | [`200710L`](<#/>) | (C++11) | Literais de string Unicode

### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    // array1 e array2 contêm os mesmos valores:
    char array1[] = "Foo" "bar";
    char array2[] = {'F', 'o', 'o', 'b', 'a', 'r', '\0'};
    
    const char* s1 = R"foo(
    Hello
      World
    )foo";
    // o mesmo que
    const char* s2 = "\nHello\n  World\n";
    // o mesmo que
    const char* s3 = "\n"
                     "Hello\n"
                     "  World\n";
    
    const wchar_t* s4 = L"ABC" L"DEF"; // OK, o mesmo que
    const wchar_t* s5 = L"ABCDEF";
    const char32_t* s6 = U"GHI" "JKL"; // OK, o mesmo que
    const char32_t* s7 = U"GHIJKL";
    const char16_t* s9 = "MN" u"OP" "QR"; // OK, o mesmo que
    const char16_t* sA = u"MNOPQR";
    
    // const auto* sB = u"Mixed" U"Types";
            // antes de C++23 pode ou não ser suportado pela
            // implementação; malformado desde C++23
    
    const wchar_t* sC = LR"--(STUV)--"; // OK, literal de string raw
    
    int main()
    {
        std::cout << array1 << ' ' << array2 << '\n'
                  << s1 << s2 << s3 << std::endl;
        std::wcout << s4 << ' ' << s5 << ' ' << sC
                   << std::endl;
    }
```

Saída:
```
    Foobar Foobar
    
    Hello
      World
    
    Hello
      World
    
    Hello
      World
    
    ABCDEF ABCDEF STUV
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 411](<https://cplusplus.github.io/CWG/issues/411.html>)
([P2029R4](<https://wg21.link/P2029R4>)) | C++98 | sequências de escape em literais de string não eram permitidas para mapear para múltiplas unidades de código | permitido
[CWG 1656](<https://cplusplus.github.io/CWG/issues/1656.html>)
([P2029R4](<https://wg21.link/P2029R4>)) | C++98 | os caracteres denotados por sequências de escape numéricas em literais de string eram pouco claros | esclarecido
---|---|---|---
[CWG 1759](<https://cplusplus.github.io/CWG/issues/1759.html>) | C++11 | um literal de string UTF-8 poderia ter unidades de código que não são representáveis em char | char pode representar todas as unidades de código UTF-8
[CWG 1823](<https://cplusplus.github.io/CWG/issues/1823.html>) | C++98 | se literais de string são distintos era definido pela implementação | a distinção é não especificada, e o mesmo literal de string pode produzir objeto diferente
[CWG 2333](<https://cplusplus.github.io/CWG/issues/2333.html>)
([P2029R4](<https://wg21.link/P2029R4>)) | C++11 | não estava claro se sequências de escape numéricas eram permitidas em literais de string UTF-8/16/32 | esclarecido
---|---|---|---
[CWG 2870](<https://cplusplus.github.io/CWG/issues/2870.html>) | C++11 | o resultado da concatenação de dois literais de string comuns era pouco claro | esclarecido
[P1854R4](<https://wg21.link/P1854R4>) | C++98 | literais de string comuns e wide com caracteres não codificáveis eram condicionalmente suportados | programas com tais literais são malformados
[P2029R4](<https://wg21.link/P2029R4>) | C++98 | 1. não estava claro se literais de string poderiam conter caracteres não codificáveis
2. não estava claro se literais de string poderiam conter sequências de escape numéricas de tal forma que as unidades de código que elas representam não são representáveis no tipo de elemento do array dos literais | 1. tornado condicionalmente suportado para literais de string comuns e wide[1](<#/doc/language/string_literal>)
2. malformado se as unidades de código não forem representáveis no tipo inteiro unsigned correspondente ao tipo subjacente

  1. [↑](<#/doc/language/string_literal>) P1854R4 foi aceito como um DR posteriormente, anulando esta resolução.

### Referências

  * padrão C++23 (ISO/IEC 14882:2024):

  * 5.13.5 Literais de string [lex.string]

  * padrão C++20 (ISO/IEC 14882:2020):

  * 5.13.5 Literais de string [lex.string]

  * padrão C++17 (ISO/IEC 14882:2017):

  * 5.13.5 Literais de string [lex.string]

  * padrão C++14 (ISO/IEC 14882:2014):

  * 2.14.5 Literais de string [lex.string]

  * padrão C++11 (ISO/IEC 14882:2011):

  * 2.14.5 Literais de string [lex.string]

  * padrão C++03 (ISO/IEC 14882:2003):

  * 2.13.4 Literais de string [lex.string]

  * padrão C++98 (ISO/IEC 14882:1998):

  * 2.13.4 Literais de string [lex.string]

### Veja também

[ literais definidos pelo usuário](<#/doc/language/user_literal>)(C++11) | literais com sufixo definido pelo usuário
[documentação C](<#/>) para Literais de string