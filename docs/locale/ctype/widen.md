# std::ctype&lt;CharT&gt;::widen, do_widen

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
CharT widen( char c ) const;
public:
const char* widen( const char* beg, const char* end, CharT* dst ) const;
protected:
virtual CharT do_widen( char c ) const;
protected:
virtual const char* do_widen( const char* beg, const char* end, CharT* dst ) const;
```

1,2) Função membro pública, chama a sobrecarga correspondente da função membro virtual protegida `do_widen` da classe mais derivada. A sobrecarga (1) chama do_widen(c), a sobrecarga (2) chama do_widen(beg, end, dst).

3) Converte o caractere de byte único c para a representação de caractere largo correspondente usando a transformação razoável mais simples. Tipicamente, isso se aplica apenas aos caracteres cuja codificação multibyte é de um único byte (por exemplo, U+0000-U+007F em UTF-8).

4) Para cada caractere no array de caracteres `[`beg`, `end`)`, escreve o caractere alargado correspondente nas localizações sucessivas no array de caracteres apontado por dst.

O alargamento (widening) sempre retorna um caractere largo, mas apenas os caracteres do [conjunto básico de caracteres fonte](<#/doc/language/charset>)(até C++23)[conjunto básico de caracteres](<#/doc/language/charset>)(desde C++23) têm garantia de possuir uma transformação de alargamento única e bem definida, que também tem garantia de ser reversível (por [narrow()](<#/doc/locale/ctype/narrow>)). Na prática, todos os caracteres cuja representação multibyte é de um único byte são geralmente alargados para seus equivalentes de caractere largo, e o restante dos possíveis valores de byte único são geralmente mapeados para o mesmo valor de placeholder, tipicamente CharT(-1).

O alargamento (widening), se bem-sucedido, preserva todas as categorias de classificação de caracteres conhecidas por [is()](<#/doc/locale/ctype/is>).

### Parâmetros

- **c** — caractere a ser convertido
- **dflt** — valor padrão a ser produzido se a conversão falhar
- **beg** — ponteiro para o primeiro caractere em um array de caracteres a ser convertido
- **end** — ponteiro um após o final para o array de caracteres a ser convertido
- **dst** — ponteiro para o primeiro elemento do array de caracteres a ser preenchido

### Valor de retorno

1,3) Caractere alargado.

2,4) end

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
     
    void try_widen(const std::ctype<wchar_t>& f, char c)
    {
        wchar_t w = f.widen(c);
        std::cout << "The single-byte character " << +(unsigned char)c
                  << " widens to " << +w << '\n';
    }
     
    int main()
    {
        std::locale::global(std::locale("cs_CZ.iso88592"));
        auto& f = std::use_facet<std::ctype<wchar_t>>(std::locale());
        std::cout << std::hex << std::showbase << "In Czech ISO-8859-2 locale:\n";
        try_widen(f, 'a');
        try_widen(f, '\xdf'); // German letter ß (U+00df) in ISO-8859-2
        try_widen(f, '\xec'); // Czech letter ě (U+011b) in ISO-8859-2
     
        std::locale::global(std::locale("cs_CZ.utf8"));
        auto& f2 = std::use_facet<std::ctype<wchar_t>>(std::locale());
        std::cout << "In Czech UTF-8 locale:\n";
        try_widen(f2, 'a');
        try_widen(f2, '\xdf'); 
        try_widen(f2, '\xec'); 
    }
```

Saída possível:
```
    In Czech ISO-8859-2 locale:
    The single-byte character 0x61 widens to 0x61
    The single-byte character 0xdf widens to 0xdf
    The single-byte character 0xec widens to 0x11b
    In Czech UTF-8 locale:
    The single-byte character 0x61 widens to 0x61
    The single-byte character 0xdf widens to 0xffffffff
    The single-byte character 0xec widens to 0xffffffff
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 153](<https://cplusplus.github.io/LWG/issue153>) | C++98 | `widen` sempre chamava a sobrecarga (4) | chama a sobrecarga correspondente

### Veja também

[ narrow](<#/doc/locale/ctype/narrow>) | invoca `do_narrow`
(função membro pública)
[ widen](<#/doc/io/basic_ios/widen>) | alarga caracteres
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ btowc](<#/doc/string/multibyte/btowc>) | alarga um caractere estreito de byte único para caractere largo, se possível
(função)