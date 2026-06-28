# Sequências de escape

Sequências de escape são usadas para representar certos caracteres especiais dentro de [literais de string](<#/doc/language/string_literal>) e [literais de caractere](<#/doc/language/character_literal>).

As seguintes sequências de escape estão disponíveis:

Sequência de escape | Descrição | Representação
Sequências de escape simples
`\'` | aspa simples | byte `0x27` na codificação ASCII
---|---|---
`\"` | aspa dupla | byte `0x22` na codificação ASCII
`\?` | ponto de interrogação | byte `0x3f` na codificação ASCII
`\\` | barra invertida | byte `0x5c` na codificação ASCII
`\a` | sinal sonoro | byte `0x07` na codificação ASCII
`\b` | retrocesso | byte `0x08` na codificação ASCII
`\f` | avanço de formulário - nova página | byte `0x0c` na codificação ASCII
`\n` | avanço de linha - nova linha | byte `0x0a` na codificação ASCII
`\r` | retorno de carro | byte `0x0d` na codificação ASCII
`\t` | tabulação horizontal | byte `0x09` na codificação ASCII
`\v** | tabulação vertical | byte `0x0b` na codificação ASCII
Sequências de escape numéricas
`\_nnn_` | valor octal arbitrário | unidade de código `_nnn_` (1~3 dígitos octais)
---|---|---
`\o{_n..._}` (desde C++23) | unidade de código `_n..._` (número arbitrário de dígitos octais)
`\x _n..._` | valor hexadecimal arbitrário | unidade de código `_n..._` (número arbitrário de dígitos hexadecimais)
`\x{_n..._}` (desde C++23)
Sequências de escape condicionais[1](<#/doc/language/escape>)
`\_c_` | Definido pela implementação | Definido pela implementação
Nomes de caracteres universais
`\u _nnnn_` | valor [Unicode](<https://en.wikipedia.org/wiki/Unicode> "enwiki:Unicode") arbitrário; pode resultar em várias unidades de código | ponto de código `U+_nnnn_` (4 dígitos hexadecimais)
---|---|---
`\u{_n..._}` (desde C++23) | ponto de código `U+_n..._` (número arbitrário de dígitos hexadecimais)
`\U _nnnnnnnn_` | ponto de código `U+_nnnnnnnn_` (8 dígitos hexadecimais)
`\N{_NAME_}` (desde C++23) | caractere Unicode arbitrário | caractere nomeado por `_NAME_` (veja [abaixo](<#/doc/language/escape>))

1. [↑](<#/doc/language/escape>) Sequências de escape condicionais são suportadas condicionalmente. O caractere `_c_` em cada sequência de escape condicional é um membro do [conjunto básico de caracteres fonte](<#/doc/language/charset>)(até C++23)[conjunto básico de caracteres](<#/doc/language/charset>)(desde C++23) que não é o caractere que segue a `\` em qualquer outra sequência de escape.

### Intervalo de nomes de caracteres universais

Se um nome de caractere universal corresponde a um ponto de código que não é 0x24 (`$`), 0x40 (`@`), nem 0x60 (`) e é menor que 0xA0, o programa é malformado. Em outras palavras, membros do [conjunto básico de caracteres fonte](<#/doc/language/charset>) e caracteres de controle (nos intervalos 0x0-0x1F e 0x7F-0x9F) não podem ser expressos em nomes de caracteres universais. | (até C++11)
---|---
Se um nome de caractere universal correspondente a um ponto de código de um membro do [conjunto básico de caracteres fonte](<#/doc/language/charset>) ou caracteres de controle aparecer fora de um [literal de caractere](<#/doc/language/character_literal>) ou [literal de string](<#/doc/language/string_literal>), o programa é malformado. Se um nome de caractere universal corresponde a um ponto de código substituto (o intervalo 0xD800-0xDFFF, inclusive), o programa é malformado. Se um nome de caractere universal usado em um literal de string UTF-16/32 não corresponde a um ponto de código em [ISO/IEC 10646](<https://www.iso.org/standard/76835.html>) (o intervalo 0x0-0x10FFFF, inclusive), o programa é malformado. | (desde C++11)
(até C++20)
Se um nome de caractere universal correspondente a um ponto de código de um membro do [conjunto básico de caracteres fonte](<#/doc/language/charset>) ou caracteres de controle aparecer fora de um [literal de caractere](<#/doc/language/character_literal>) ou [literal de string](<#/doc/language/string_literal>), o programa é malformado. Se um nome de caractere universal não corresponde a um ponto de código em [ISO/IEC 10646](<https://www.iso.org/standard/76835.html>) (o intervalo 0x0-0x10FFFF, inclusive) ou corresponde a um ponto de código substituto (o intervalo 0xD800-0xDFFF, inclusive), o programa é malformado. | (desde C++20)
(até C++23)
Se um nome de caractere universal correspondente a um valor escalar de um caractere no [conjunto básico de caracteres](<#/doc/language/charset>) ou um caractere de controle aparecer fora de um [literal de caractere](<#/doc/language/character_literal>) ou [literal de string](<#/doc/language/string_literal>), o programa é malformado. Se um nome de caractere universal não corresponde a um valor escalar de um caractere no [conjunto de caracteres de tradução](<#/doc/language/charset>), o programa é malformado. | (desde C++23)

#### Escapes de caracteres universais nomeados

|
---
`\N{` n-char-sequence `}`
- **n-char-sequence** — um ou mais n-chars
- **n-char** — um caractere do [conjunto de caracteres de tradução](<#/doc/language/charset>), exceto a chave direita } ou o caractere de nova linha

Um nome de caractere universal com a sintaxe acima é um _caractere universal nomeado_. Ele designa o caractere correspondente no [Padrão Unicode](<https://www.unicode.org/versions/latest/>) ([capítulo 4.8 Nome](<https://www.unicode.org/versions/latest/ch04.pdf>)) se a sequência n-char for igual ao seu nome de caractere ou a um de seus aliases de nome de caractere do tipo "control", "correction" ou "alternate"; caso contrário, o programa é malformado.

Esses aliases estão listados no [Unicode Character Database](<https://www.unicode.org/reports/tr44/>)’s [NameAliases.txt](<https://www.unicode.org/Public/UCD/latest/ucd/NameAliases.txt>). Nenhum desses nomes ou aliases possui espaços iniciais ou finais.

Uma sequência n-char válida deve conter apenas letras latinas maiúsculas de A a Z, dígitos, espaço e hífen. Outros caracteres nunca ocorrem em um nome de caractere Unicode e, portanto, sua aparição em uma sequência n-char sempre torna o programa malformado.

(desde C++23)

### Notas

`\0` é a sequência de escape octal mais comumente usada, pois representa o caractere nulo terminador em [strings terminadas em nulo](<#/doc/string>).

O caractere de nova linha `\n` tem um significado especial quando usado em [E/S em modo texto](<#/doc/io/c>): ele é convertido para a representação de nova linha específica do sistema operacional, geralmente um byte ou sequência de bytes. Alguns sistemas marcam suas linhas com campos de comprimento em vez disso.

Sequências de escape octais têm um limite de três dígitos octais, mas terminam no primeiro caractere que não é um dígito octal válido, se encontrado antes.

Sequências de escape hexadecimais não têm limite de comprimento e terminam no primeiro caractere que não é um dígito hexadecimal válido. Se o valor representado por uma única sequência de escape hexadecimal não se encaixa no intervalo de valores representados pelo tipo de caractere usado neste literal de string (char, char8_t, (desde C++20)char16_t, char32_t, (desde C++11)ou wchar_t), o resultado é não especificado.

Um nome de caractere universal em um literal de string estreito ou um literal de string de 16 bits pode mapear para mais de uma unidade de código, por exemplo, `\U0001f34c` são 4 unidades de código char em UTF-8 (`\xF0\x9F\x8D\x8C`) e 2 unidades de código char16_t em UTF-16 (`\xD83C\xDF4C`). | (desde C++11)

A sequência de escape de ponto de interrogação `\?` é usada para evitar que [trígrafos](<#/doc/language/operator_alternative>) sejam interpretados dentro de literais de string: uma string como "`??/`" é compilada como "`\`", mas se o segundo ponto de interrogação for escapado, como em "`?\?/`", ela se torna "`??/`". Como os trígrafos foram removidos do C++, a sequência de escape de ponto de interrogação não é mais necessária. Ela é preservada para compatibilidade com C++14 (e revisões anteriores) e C.(desde C++17)

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_named_character_escapes`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Escapes de caracteres universais nomeados

### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    int main()
    {
        std::cout << "This\nis\na\ntest\n\n";
        std::cout << "She said, \"Sells she seashells on the seashore?\"\n";
    }
```

Saída:
```
    This
    is
    a
    test
    
    She said, "Sells she seashells on the seashore?"
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 505](<https://cplusplus.github.io/CWG/issues/505.html>) | C++98 | o comportamento era indefinido se o caractere que seguia uma barra invertida não fosse um dos especificados na tabela | tornou-se condicionalmente suportado (a semântica é definida pela implementação)

### Veja também

* [Tabela ASCII](<#/doc/language/ascii>)

[Documentação C](<#/>) para Sequência de escape
---