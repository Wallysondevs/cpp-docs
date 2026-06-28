# Especificação de formato padrão (desde C++20)

Para tipos básicos e tipos de string, a especificação de formato é baseada na [especificação de formato do Python](<https://docs.python.org/3/library/string.html#formatspec>).

A sintaxe das especificações de formato é:

---
fill-and-align ﻿(opcional) sign ﻿(opcional) `#`(opcional) `0`(opcional) width ﻿(opcional) precision ﻿(opcional) `L`(opcional) type ﻿(opcional)

As opções sign, `#` e `0` são válidas apenas quando um tipo de apresentação inteiro ou de ponto flutuante é usado.

### Preenchimento e alinhamento

fill-and-align é um caractere de _preenchimento_ opcional (que pode ser qualquer caractere diferente de `{` ou `}`), seguido por uma das opções de _alinhamento_ `<`, `>`, `^`.

Se nenhum caractere de preenchimento for especificado, o padrão é o caractere de espaço. Para uma especificação de formato em uma codificação Unicode, o caractere de preenchimento deve corresponder a um único valor escalar Unicode.

O significado das opções de _alinhamento_ é o seguinte:

  * `<`: Força o argumento formatado a ser alinhado ao início do espaço disponível, inserindo n caracteres de preenchimento após o argumento formatado. Este é o padrão quando um tipo de apresentação que não é inteiro nem de ponto flutuante é usado.
  * `>`: Força o argumento formatado a ser alinhado ao final do espaço disponível, inserindo n caracteres de preenchimento antes do argumento formatado. Este é o padrão quando um tipo de apresentação inteiro ou de ponto flutuante é usado.
  * `^`: Força o argumento formatado a ser centralizado no espaço disponível, inserindo ⌊n
---
2
⌋ caracteres antes e ⌈n
---
2
⌉ caracteres após o argumento formatado.

Em cada caso, n é a diferença entre a largura mínima do campo (especificada por width) e a [largura estimada](<#/doc/utility/format/spec>) do argumento formatado, ou 0 se a diferença for menor que 0.

Run this code
```cpp
    #include <cassert>
    #include <format>
    
    int main()
    {
        char c = 120;
        assert(std::format("{:6}", 42)    == "    42");
        assert(std::format("{:6}", 'x')   == "x     ");
        assert(std::format("{:*<6}", 'x') == "x*****");
        assert(std::format("{:*>6}", 'x') == "*****x");
        assert(std::format("{:*^6}", 'x') == "**x***");
        assert(std::format("{:6d}", c)    == "   120");
        assert(std::format("{:6}", true)  == "true  ");
    }
```

### Sinal, # e 0

A opção sign pode ser uma das seguintes:

  * `+`: Indica que um sinal deve ser usado tanto para números não negativos quanto para negativos. O sinal `+` é inserido antes do valor de saída para números não negativos.
  * `-`: Indica que um sinal deve ser usado apenas para números negativos (este é o comportamento padrão).
  * espaço: Indica que um espaço inicial deve ser usado para números não negativos, e um sinal de menos para números negativos.

Zero negativo é tratado como um número negativo.

A opção sign se aplica a infinito de ponto flutuante e NaN.

Run this code
```cpp
    #include <cassert>
    #include <format>
    #include <limits>
    
    int main()
    {
        double inf = std::numeric_limits<double>::infinity();
        double nan = std::numeric_limits<double>::quiet_NaN();
        assert(std::format("{0:},{0:+},{0:-},{0: }", 1)   == "1,+1,1, 1");
        assert(std::format("{0:},{0:+},{0:-},{0: }", -1)  == "-1,-1,-1,-1");
        assert(std::format("{0:},{0:+},{0:-},{0: }", inf) == "inf,+inf,inf, inf");
        assert(std::format("{0:},{0:+},{0:-},{0: }", nan) == "nan,+nan,nan, nan");
    }
```

A opção `#` faz com que a _forma alternativa_ seja usada para a conversão.

  * Para tipos integrais, quando um tipo de apresentação binário, octal ou hexadecimal é usado, a forma alternativa insere o prefixo (`0b`, `0` ou `0x`) no valor de saída após o caractere de sinal (possivelmente espaço), se houver um, ou o adiciona antes do valor de saída, caso contrário.
  * Para tipos de ponto flutuante, a forma alternativa faz com que o resultado da conversão de valores finitos sempre contenha um caractere de ponto decimal, mesmo que nenhum dígito o siga. Normalmente, um caractere de ponto decimal aparece no resultado dessas conversões apenas se um dígito o seguir. Além disso, para conversões `g` e `G`, zeros à direita não são removidos do resultado.

A opção `0` preenche o campo com zeros à esquerda (seguindo qualquer indicação de sinal ou base) até a largura do campo, exceto quando aplicada a um infinito ou NaN. Se o caractere `0` e uma opção de _alinhamento_ aparecerem, o caractere `0` é ignorado.

Run this code
```cpp
    #include <cassert>
    #include <format>
    
    int main()
    {
        char c = 120;
        assert(std::format("{:+06d}", c)   == "+00120");
        assert(std::format("{:#06x}", 0xa) == "0x000a");
        assert(std::format("{:<06}", -42)  == "-42   "); // 0 is ignored because of '<'
    }
```

### Largura e precisão

width é um número decimal positivo, ou um campo de substituição aninhado (`{}` ou `{`_n_`}`). Se presente, ele especifica a largura mínima do campo.

precision é um ponto (`.`) seguido por um número decimal não negativo ou um campo de substituição aninhado. Este campo indica a precisão ou o tamanho máximo do campo. Ele só pode ser usado com tipos de ponto flutuante e string.

  * Para tipos de ponto flutuante, este campo especifica a precisão de formatação.
  * Para tipos de string, ele fornece um limite superior para a largura estimada (veja [abaixo](<#/doc/utility/format/spec>)) do prefixo da string a ser copiada para a saída. Para uma string em uma codificação Unicode, o texto a ser copiado para a saída é o prefixo mais longo de clusters de grafemas estendidos completos cuja largura estimada não é maior que a precisão.

Se um campo de substituição aninhado for usado para width ou precision, e o argumento correspondente não for de [tipo integral](<#/doc/language/type-id>)(até C++23)[tipo inteiro padrão com ou sem sinal](<#/doc/language/type-id>)(desde C++23), ou for negativo, uma exceção do tipo [std::format_error](<#/doc/utility/format/format_error>) é lançada.
```cpp
    float pi = 3.14f;
    assert(std::format("{:10f}", pi)           == "  3.140000"); // width = 10
    assert(std::format("{:{}f}", pi, 10)       == "  3.140000"); // width = 10
    assert(std::format("{:.5f}", pi)           == "3.14000");    // precision = 5
    assert(std::format("{:.{}f}", pi, 5)       == "3.14000");    // precision = 5
    assert(std::format("{:10.5f}", pi)         == "   3.14000"); // width = 10, precision = 5
    assert(std::format("{:{}.{}f}", pi, 10, 5) == "   3.14000"); // width = 10, precision = 5
    
    auto b1 = std::format("{:{}f}", pi, 10.0); // throws: width is not of integral type
    auto b2 = std::format("{:{}f}", pi, -10);  // throws: width is negative
    auto b3 = std::format("{:.{}f}", pi, 5.0); // throws: precision is not of integral type
```

A largura de uma string é definida como o número estimado de posições de coluna apropriadas para exibi-la em um terminal.

Para fins de cálculo de largura, assume-se que uma string está em uma codificação definida pela implementação. O método de cálculo de largura não é especificado, mas para uma string em uma codificação Unicode, a implementação deve estimar a largura da string como a soma das larguras estimadas dos primeiros pontos de código em seus [clusters de grafemas estendidos](<https://www.unicode.org/reports/tr29/>). A largura estimada é 2 para os seguintes pontos de código, e 1 caso contrário:

  * Qualquer ponto de código cuja propriedade Unicode [`East_Asian_Width`](<https://www.unicode.org/reports/tr44/#East_Asian_Width>) tenha valor Fullwidth (`F`) ou Wide (`W`)
  * U+4DC0 - U+4DFF (Símbolos de Hexagramas Yijing)
  * U+1F300 – U+1F5FF (Símbolos e Pictogramas Diversos)
  * U+1F900 – U+1F9FF (Símbolos e Pictogramas Suplementares)

Run this code
```cpp
    #include <cassert>
    #include <format>
    
    int main()
    {
        assert(std::format("{:.^5s}",   "🐱")    == ".🐱..");
        assert(std::format("{:.5s}",    "🐱🐱🐱") == "🐱🐱");
        assert(std::format("{:.<5.5s}", "🐱🐱🐱") == "🐱🐱.");
    }
```

### L (formatação específica de locale)

A opção `L` faz com que a forma específica de locale seja usada. Esta opção é válida apenas para tipos aritméticos.

  * Para tipos integrais, a forma específica de locale insere os caracteres separadores de grupo de dígitos apropriados de acordo com o locale do contexto.
  * Para tipos de ponto flutuante, a forma específica de locale insere os caracteres separadores de grupo de dígitos e de radix apropriados de acordo com o locale do contexto.
  * Para a representação textual de `bool`, a forma específica de locale usa a string apropriada como se obtida com [std::numpunct::truename](<#/doc/locale/numpunct/truefalsename>) ou [std::numpunct::falsename](<#/doc/locale/numpunct/truefalsename>).

### Tipo

A opção type determina como os dados devem ser apresentados.

Os tipos de apresentação de string disponíveis são:

  * none, `s`: Copia a string para a saída.

  * `?`: Copia a string escapada (veja [abaixo](<#/doc/utility/format/spec>)) para a saída.

| (desde C++23)

Os tipos de apresentação inteiros disponíveis para tipos integrais diferentes de char, wchar_t e bool são:

  * `b`: Formato binário. Produz a saída como se chamasse [std::to_chars](<#/doc/utility/to_chars>)(first, last, value, 2). O prefixo da base é `0b`.
  * `B`: o mesmo que `b`, exceto que o prefixo da base é `0B`.
  * `c`: Copia o caractere static_cast&lt;CharT&gt;(value) para a saída, onde `CharT` é o tipo de caractere da string de formato. Lança [std::format_error](<#/doc/utility/format/format_error>) se value não estiver no intervalo de valores representáveis para `CharT`.
  * `d`: Formato decimal. Produz a saída como se chamasse [std::to_chars](<#/doc/utility/to_chars>)(first, last, value).
  * `o`: Formato octal. Produz a saída como se chamasse [std::to_chars](<#/doc/utility/to_chars>)(first, last, value, 8). O prefixo da base é `0` se o valor do argumento correspondente for diferente de zero e vazio caso contrário.
  * `x`: Formato hexadecimal. Produz a saída como se chamasse [std::to_chars](<#/doc/utility/to_chars>)(first, last, value, 16). O prefixo da base é `0x`.
  * `X`: o mesmo que `x`, exceto que usa letras maiúsculas para dígitos acima de 9 e o prefixo da base é `0X`.
  * none: o mesmo que `d`.

Os tipos de apresentação de char e wchar_t disponíveis são:

  * none, `c`: Copia o caractere para a saída.
  * `b`, `B`, `d`, `o`, `x`, `X`: Usa tipos de apresentação inteiros com o valor static_cast&lt;unsigned char&gt;(value) ou static_cast<[std::make_unsigned_t](<#/doc/types/make_unsigned>)<wchar_t>>(value) respectivamente.

  * `?`: Copia o caractere escapado (veja [abaixo](<#/doc/utility/format/spec>)) para a saída.

| (desde C++23)

Os tipos de apresentação de bool disponíveis são:

  * none, `s`: Copia a representação textual (`true` ou `false`, ou a forma específica de locale) para a saída.
  * `b`, `B`, `d`, `o`, `x`, `X`: Usa tipos de apresentação inteiros com o valor static_cast&lt;unsigned char&gt;(value).

Os tipos de apresentação de ponto flutuante disponíveis são:

  * `a`: Se _precision_ for especificada, produz a saída como se chamasse [std::to_chars](<#/doc/utility/to_chars>)(first, last, value, std::chars_format::hex, precision) onde precision é a precisão especificada; caso contrário, a saída é produzida como se chamasse [std::to_chars](<#/doc/utility/to_chars>)(first, last, value, std::chars_format::hex).
  * `A`: o mesmo que `a`, exceto que usa letras maiúsculas para dígitos acima de 9 e usa `P` para indicar o expoente.
  * `e`: Produz a saída como se chamasse [std::to_chars](<#/doc/utility/to_chars>)(first, last, value, std::chars_format::scientific, precision) onde precision é a precisão especificada, ou 6 se precision não for especificada.
  * `E`: o mesmo que `e`, exceto que usa `E` para indicar o expoente.
  * `f`, `F`: Produz a saída como se chamasse [std::to_chars](<#/doc/utility/to_chars>)(first, last, value, std::chars_format::fixed, precision) onde precision é a precisão especificada, ou 6 se precision não for especificada.
  * `g`: Produz a saída como se chamasse [std::to_chars](<#/doc/utility/to_chars>)(first, last, value, std::chars_format::general, precision) onde precision é a precisão especificada, ou 6 se precision não for especificada.
  * `G`: o mesmo que `g`, exceto que usa `E` para indicar o expoente.
  * none: Se _precision_ for especificada, produz a saída como se chamasse [std::to_chars](<#/doc/utility/to_chars>)(first, last, value, std::chars_format::general, precision) onde precision é a precisão especificada; caso contrário, a saída é produzida como se chamasse [std::to_chars](<#/doc/utility/to_chars>)(first, last, value).

Para tipos de apresentação em minúsculas, infinito e NaN são formatados como `inf` e `nan`, respectivamente. Para tipos de apresentação em maiúsculas, infinito e NaN são formatados como `INF` e `NAN`, respectivamente.

Os tipos de apresentação de ponteiro disponíveis (também usados para [std::nullptr_t](<#/doc/types/nullptr_t>)) são:

  * none, `p`: Se [std::uintptr_t](<#/doc/types/integer>) for definido, produz a saída como se chamasse [std::to_chars](<#/doc/utility/to_chars>)(first, last, reinterpret_cast<[std::uintptr_t](<#/doc/types/integer>)>(value), 16) com o prefixo `0x` adicionado à saída; caso contrário, a saída é definida pela implementação.

  * `P`: o mesmo que `p`, exceto que usa letras maiúsculas para dígitos acima de 9 e o prefixo da base é `0X`.

| (desde C++26)

### Formatando caracteres e strings escapados

Um caractere ou string pode ser formatado como _escapado_ para torná-lo mais adequado para depuração ou para logging. O escape é feito da seguinte forma:

  * Para cada sequência de unidades de código bem formada que codifica um caractere _C_ :

  * Se _C_ for um dos caracteres na tabela a seguir, a sequência de escape correspondente é usada.

| Caractere | Sequência de escape | Notas
---|---|---
tabulação horizontal (byte 0x09 na codificação ASCII) | `\t` |
quebra de linha (byte 0x0a na codificação ASCII) | `\n` |
retorno de carro (byte 0x0d na codificação ASCII) | `\r` |
aspas duplas (byte 0x22 na codificação ASCII) | `\"` | Usado apenas se a saída for uma string entre aspas duplas
aspas simples (byte 0x27 na codificação ASCII) | `\'` | Usado apenas se a saída for uma string entre aspas simples
barra invertida (byte 0x5c na codificação ASCII) | `\\` |

  * Caso contrário, se _C_ não for o caractere de espaço (byte 0x20 na codificação ASCII), e ou

  * a codificação de caractere associada for uma codificação Unicode e

  * _C_ corresponder a um valor escalar Unicode cuja propriedade Unicode [`General_Category`](<https://www.unicode.org/reports/tr44/#General_Category_Values>) tiver um valor nos grupos `Separator` (`Z`) ou `Other` (`C`), ou
  * _C_ não for imediatamente precedido por um caractere não escapado, e _C_ corresponder a um valor escalar Unicode que tenha a propriedade Unicode `Grapheme_Extend=Yes`, ou

  * a codificação de caractere associada não for uma codificação Unicode e _C_ for um de um conjunto de caracteres separadores ou não imprimíveis definidos pela implementação

     a sequência de escape é `\u{**_hex-digit-sequence_**}`, onde `_hex-digit-sequence_` é a representação hexadecimal mais curta de _C_ usando dígitos hexadecimais minúsculos.

  * Caso contrário, _C_ é copiado como está.

  * Uma sequência de unidades de código que é uma sequência de shift tem efeito não especificado na saída e na decodificação posterior da string.
  * Outras unidades de código (ou seja, aquelas em sequências de unidades de código malformadas) são cada uma substituídas por `\x{**_hex-digit-sequence_**}`, onde `_hex-digit-sequence_` é a representação hexadecimal mais curta da unidade de código usando dígitos hexadecimais minúsculos.

A representação de string escapada de uma string é construída escapando as sequências de unidades de código na string, conforme descrito acima, e colocando o resultado entre aspas duplas.

A representação escapada de um caractere é construída escapando-o conforme descrito acima, e colocando o resultado entre aspas simples.

[Demonstração no Compiler Explorer](<https://godbolt.org/z/WxhTs6b69>):

Run this code
```cpp
    #include <print>
    
    int main()
    {
        std::println("[{:?}]", "h\tllo");             // prints: ["h\tllo"]
        std::println("[{:?}]", "Спасибо, Виктор ♥!"); // prints: ["Спасибо, Виктор ♥!"]
        std::println("[{:?}] [{:?}]", '\'', '"');     // prints: ['\'', '"']
    
        // The following examples assume use of the UTF-8 encoding
        std::println("[{:?}]", std::string("\0 \n \t \x02 \x1b", 9));
                                                 // prints: ["\u{0} \n \t \u{2} \u{1b}"]
        std::println("[{:?}]", "\xc3\x28");      // invalid UTF-8
                                                 // prints: ["\x{c3}("]
        std::println("[{:?}]", "\u0301");        // prints: ["\u{301}"]
        std::println("[{:?}]", "\\\u0301");      // prints: ["\\\u{301}"]
        std::println("[{:?}]", "e\u0301\u0323"); // prints: ["ẹ́"]
    }
```

(desde C++23)

### Notas

Na maioria dos casos, a sintaxe é semelhante à antiga formatação com `%`, com a adição de `{}` e com `:` usado em vez de `%`. Por exemplo, "%03.2f" pode ser traduzido para "{:03.2f}".

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
[`__cpp_lib_format_uchar`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++20)
(DR) | Formatação de unidades de código como inteiros sem sinal

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 3721](<https://cplusplus.github.io/LWG/issue3721>) | C++20 | zero não é permitido para o campo width
na especificação de formato padrão | zero é permitido se especificado
via um campo de substituição
[P2909R4](<https://wg21.link/P2909R4>) | C++20 | char ou wchar_t podem ser formatados como
valores inteiros sem sinal fora do intervalo | unidades de código são convertidas para o tipo
sem sinal correspondente antes de tal formatação