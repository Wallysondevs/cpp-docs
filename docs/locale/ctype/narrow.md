# std::ctype&lt;CharT&gt;::narrow, do_narrow

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
char narrow( CharT c, char dflt ) const;
public:
const CharT* narrow( const CharT* beg, const CharT* end,
char dflt, char* dst ) const;
protected:
virtual char do_narrow( CharT c, char dflt ) const;
protected:
virtual const CharT* do_narrow( const CharT* beg, const CharT* end,
char dflt, char* dst ) const;
```

1,2) Função membro pública, chama a sobrecarga correspondente da função membro virtual protegida `do_narrow` da classe mais derivada. A sobrecarga (1) chama do_narrow(c, dflt), a sobrecarga (2) chama do_narrow(beg, end, dflt, dst).

3) Converte o caractere c (possivelmente wide) para representação multibyte se o caractere puder ser representado com um único byte (por exemplo, caracteres ASCII em codificação UTF-8 são bytes únicos). Retorna dflt se tal conversão não existir.

4) Para cada caractere no array de caracteres `[`beg`, `end`)`, escreve caracteres estreitados (ou dflt sempre que o estreitamento falhar) nas localizações sucessivas no array de caracteres apontado por dst.

O estreitamento é sempre bem-sucedido e sempre reversível (chamando [widen()](<#/doc/locale/ctype/widen>)) para todos os caracteres do [conjunto de caracteres fonte básico](<#/doc/language/charset>)(até C++23)[conjunto de caracteres básico](<#/doc/language/charset>)(desde C++23).

*   i.e. do_widen(do_narrow(c, 0)) == c sempre é verdadeiro para qualquer caractere c no [conjunto de caracteres fonte básico](<#/doc/language/charset>)(até C++23)[conjunto de caracteres básico](<#/doc/language/charset>)(desde C++23).

O estreitamento, se bem-sucedido, preserva todas as categorias de classificação de caracteres conhecidas por [is()](<#/doc/locale/ctype/is>).

*   i.e. is(m, c) || !ctc.is(m, do_narrow(c, dflt)) é sempre verdadeiro para qualquer categoria `ctype` nomeada com uma facet ctc de `ctype<char>` e valor m de `ctype_base::mask` (a menos que `do_narrow` retorne dflt).

O estreitamento de qualquer caractere dígito garante que, se o resultado for subtraído do literal de caractere '0', a diferença será igual ao valor do dígito do caractere original.

*   i.e. para qualquer caractere dígito c, a expressão (do_narrow(c, dflt) - '0') avalia para o valor do dígito do caractere.

### Parâmetros

- **c** — caractere a converter
- **dflt** — valor padrão a ser produzido se a conversão falhar
- **beg** — ponteiro para o primeiro caractere em um array de caracteres a converter
- **end** — ponteiro um após o final para o array de caracteres a converter
- **dst** — ponteiro para o primeiro elemento do array de caracteres a preencher

### Valor de retorno

1,3) Caractere estreitado ou dflt se o estreitamento falhar.

2,4) end

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    void try_narrow(const std::ctype<wchar_t>& f, wchar_t c)
    {
        char n = f.narrow(c, 0);
        if (n)
            std::wcout << '\'' << c << "' narrowed to " << +(unsigned char)n << '\n';
        else
            std::wcout << '\'' << c << "' could not be narrowed\n";
    }
    
    int main()
    {
        std::locale::global(std::locale>("en_US.utf8"));
        std::wcout.imbue(std::locale());
        std::wcout << std::hex << std::showbase << "In US English UTF-8 locale:\n";
        auto& f = std::use_facet<std::ctype<wchar_t>>(std::locale());
        try_narrow(f, L'A');
        try_narrow(f, L'Ａ');
        try_narrow(f, L'ě');
    
        std::locale::global(std::locale>("cs_CZ.iso88592"));
        auto& f2 = std::use_facet<std::ctype<wchar_t>>(std::locale());
        std::wcout << "In Czech ISO-8859-2 locale:\n";
        try_narrow(f2, L'A');
        try_narrow(f2, L'Ａ');
        try_narrow(f2, L'ě');
    }
```

Saída possível:
```
    In US English UTF-8 locale:
    'A' narrowed to 0x41
    'Ａ' could not be narrowed
    'ě' could not be narrowed
    In Czech ISO-8859-2 locale:
    'A' narrowed to 0x41
    'Ａ' could not be narrowed
    'ě' narrowed to 0xec
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 126](<https://cplusplus.github.io/LWG/issue126>) | C++98 | 1. o código que representa a reversibilidade era
do_widen(do_narrow(c), 0) == c
2. o código que representa a preservação de categoria era
is(m, c) || !ctc.is(m, do_narrow(c), dflt) | ambos corrigidos
---|---|---|---
[LWG 153](<https://cplusplus.github.io/LWG/issue153>) | C++98 | `narrow` sempre chamava a sobrecarga (4) | chama a sobrecarga correspondente

### Veja também

[ widen](<#/doc/locale/ctype/widen>) | invoca `do_widen`
(função membro pública)
[ narrow](<#/doc/io/basic_ios/narrow>) | estreita caracteres
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ wctob](<#/doc/string/multibyte/wctob>) | estreita um caractere wide para um caractere narrow de byte único, se possível
(função)