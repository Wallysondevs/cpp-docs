# Literal de Caractere

### Sintaxe

---
`'` c-char ﻿`'` | (1) |
---|---|---
`u8'` c-char ﻿`'` | (2) | (desde C++17)
`u'` c-char ﻿`'` | (3) | (desde C++11)
`U'` c-char ﻿`'` | (4) | (desde C++11)
`L'` c-char ﻿`'` | (5) |
`'` c-char-sequence ﻿`'` | (6) |
`L'` c-char-sequence ﻿`'` | (7) | (ate C++23)
- **c-char** — ou

  * um basic-c-char,
  * uma sequência de escape, conforme definido em [sequências de escape](<#/doc/language/escape>)
  * um nome de caractere universal, conforme definido em [sequências de escape](<#/doc/language/escape>)

- **basic-c-char** — Um caractere do [conjunto de caracteres fonte básico](<#/doc/language/charset>)(ate C++23)[conjunto de caracteres de tradução](<#/doc/language/charset>)(desde C++23), exceto a aspa simples ', a barra invertida \, ou o caractere de nova linha
- **c-char-sequence** — dois ou mais c-chars

### Explicação

1) Literal de caractere comum, por exemplo, 'a' ou '\n' ou '\13'. Tal literal tem o tipo char e o valor igual à representação de c-char no [conjunto de caracteres de execução](<#/doc/language/charset>)(ate C++23)o ponto de código correspondente da [codificação de literal comum](<#/doc/language/charset>)(desde C++23).

2) Literal de caractere UTF-8, por exemplo, u8'a'. Tal literal tem o tipo char(ate C++20)char8_t(desde C++20) e o valor igual ao valor do ponto de código [ISO/IEC 10646](<https://www.iso.org/standard/76835.html>) de c-char, desde que o valor do ponto de código seja representável com uma única unidade de código UTF-8 (ou seja, c-char está no intervalo 0x0-0x7F, inclusive).

3) Literal de caractere UTF-16, por exemplo, u'猫', mas não u'🍌' (u'\U0001f34c'). Tal literal tem o tipo char16_t e o valor igual ao valor do ponto de código [ISO/IEC 10646](<https://www.iso.org/standard/76835.html>) de c-char, desde que o valor do ponto de código seja representável com uma única unidade de código UTF-16 (ou seja, c-char está no intervalo 0x0-0xFFFF, inclusive).

4) Literal de caractere UTF-32, por exemplo, U'猫' ou U'🍌'. Tal literal tem o tipo char32_t e o valor igual ao valor do ponto de código [ISO/IEC 10646](<https://www.iso.org/standard/76835.html>) de c-char.

5) Literal de caractere largo, por exemplo, L'β' ou L'猫'. Tal literal tem o tipo wchar_t e o valor igual ao valor de c-char no conjunto de caracteres largos de execução(ate C++23)o ponto de código correspondente da codificação de literal largo(desde C++23).

6) Literal multicaractere comum(ate C++23)Literal multicaractere(desde C++23), por exemplo, 'AB', é suportado condicionalmente, tem o tipo int e valor definido pela implementação.

7) Literal multicaractere largo, por exemplo, L'AB', é suportado condicionalmente, tem o tipo wchar_t e valor definido pela implementação.

#### Caracteres não codificáveis

1-5) Dado que c-char não é uma sequência de escape numérica (veja abaixo), se c-char não for representável na codificação de caractere associada ao literal ou não puder ser codificado como uma única unidade de código nessa codificação (por exemplo, um valor não-BMP no Windows onde wchar_t tem 16 bits), o programa é malformado.

6) Se qualquer c-char em c-char-sequence não puder ser codificado como uma única unidade de código na [codificação de literal comum](<#/doc/language/charset>), o programa é malformado.

7) Se qualquer c-char em c-char-sequence não puder ser codificado como uma única unidade de código na [codificação de literal largo](<#/doc/language/charset>), o programa é malformado. | (ate C++23)

#### Sequências de escape numéricas

Sequências de escape numéricas (octais e hexadecimais) podem ser usadas para especificar o valor do caractere.

Se o literal de caractere contiver apenas uma sequência de escape numérica, e o valor especificado pela sequência de escape for representável pela versão unsigned de seu tipo, o literal de caractere terá o mesmo valor que o valor especificado (possivelmente após conversão para o tipo de caractere). Um literal de caractere UTF-_N_ pode ter qualquer valor representável por seu tipo. Se o valor não corresponder a um ponto de código Unicode válido, ou se seu ponto de código correspondente não for representável como uma única unidade de código em UTF-_N_, ele ainda pode ser especificado por uma sequência de escape numérica com o valor. Por exemplo, u8'\xff' é bem-formado e igual a char8_t(0xFF). | (desde C++23)

Se o valor especificado por uma sequência de escape numérica usada em um literal de caractere comum ou largo não for representável por char ou wchar_t, respectivamente, o valor do literal de caractere é definido pela implementação. | (ate C++23)
---|---
Se o valor especificado por uma sequência de escape numérica usada em um literal de caractere comum ou largo com um c-char for representável pela versão unsigned do tipo subjacente de char ou wchar_t, respectivamente, o valor do literal é o valor inteiro desse tipo inteiro unsigned e o valor especificado convertido para o tipo do literal. Caso contrário, o programa é malformado. | (desde C++23)

Se o valor especificado por uma sequência de escape numérica usada em um literal de caractere UTF-_N_ não for representável pelo char _N_ _t correspondente, o valor do literal de caractere é definido pela implementação(ate C++17)o programa é malformado(desde C++17). | (desde C++11)

### Notas

Literais multicaractere foram herdados pelo C da linguagem de programação B. Embora não especificado pelo padrão C ou C++, a maioria dos compiladores (MSVC é uma exceção notável) implementa literais multicaractere conforme especificado em B: os valores de cada char no literal inicializam bytes sucessivos do inteiro resultante, em ordem big-endian preenchida com zeros e alinhada à direita, por exemplo, o valor de '\1' é 0x00000001 e o valor de '\1\2\3\4' é 0x01020304.

Em C, constantes de caractere como 'a' ou '\n' têm o tipo int, em vez de char.

### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <iomanip>
    #include <iostream>
    #include <string_view>
    
    template<typename CharT>
    void dump(std::string_view s, const CharT c)
    {
        const uint8_t* data{reinterpret_cast<const uint8_t*>(&c)};
    
        std::cout << s << " \t" << std::hex
                  << std::uppercase << std::setfill('0');
    
        for (auto i{0U}; i != sizeof(CharT); ++i)
            std::cout << std::setw(2) << static_cast<unsigned>(data[i]) << ' ';
    
        std::cout << '\n';
    }
    
    void print(std::string_view str = "") { std::cout << str << '\n'; }
    
    int main()
    {
        print("Ordinary character literals:");
        char c1 = 'a'; dump("'a'", c1);
        char c2 = '\x2a'; dump("'*'", c2);
    
        print("\n" "Ordinary multi-character literals:");
        int mc1 = 'ab'; dump("'ab'", mc1);       // implementation-defined
        int mc2 = 'abc'; dump("'abc'", mc2);     // implementation-defined
    
        print("\n" "UTF-8 character literals:");
        char8_t C1 = u8'a'; dump("u8'a'", C1);
    //  char8_t C2 = u8'¢'; dump("u8'¢'", C2);   // error: ¢ maps to two UTF-8 code units
    //  char8_t C3 = u8'猫'; dump("u8'猫'", C3); // error: 猫 maps to three UTF-8 code units
    //  char8_t C4 = u8'🍌'; dump("u8'🍌'", C4); // error: 🍌 maps to four UTF-8 code units
    
        print("\n" "UTF-16 character literals:");
        char16_t uc1 = u'a'; dump("u'a'", uc1);
        char16_t uc2 = u'¢'; dump("u'¢'", uc2);
        char16_t uc3 = u'猫'; dump("u'猫'", uc3);
    //  char16_t uc4 = u'🍌'; dump("u'🍌'", uc4); // error: 🍌 maps to two UTF-16 code units
    
        print("\n" "UTF-32 character literals:");
        char32_t Uc1 = U'a'; dump("U'a'", Uc1);
        char32_t Uc2 = U'¢'; dump("U'¢'", Uc2);
        char32_t Uc3 = U'猫'; dump("U'猫'", Uc3);
        char32_t Uc4 = U'🍌'; dump("U'🍌'", Uc4);
    
        print("\n" "Wide character literals:");
        wchar_t wc1 = L'a'; dump("L'a'", wc1);
        wchar_t wc2 = L'¢'; dump("L'¢'", wc2);
        wchar_t wc3 = L'猫'; dump("L'猫'", wc3);
        wchar_t wc4 = L'🍌'; dump("L'🍌'", wc4);  // unsupported on Windows since C++23
    }
```

Saída possível:
```
    Ordinary character literals:
    'a' 	61 
    '*' 	2A 
    
    Ordinary multi-character literals:
    'ab' 	62 61 00 00 
    'abc' 	63 62 61 00 
    
    UTF-8 character literals:
    u8'a' 	61 
    
    UTF-16 character literals:
    u'a' 	61 00 
    u'¢' 	A2 00 
    u'猫' 	2B 73 
    
    UTF-32 character literals:
    U'a' 	61 00 00 00 
    U'¢' 	A2 00 00 00 
    U'猫' 	2B 73 00 00 
    U'🍌' 	4C F3 01 00 
    
    Wide character literals:
    L'a' 	61 00 00 00 
    L'¢' 	A2 00 00 00 
    L'猫' 	2B 73 00 00 
    L'🍌' 	4C F3 01 00
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 912](<https://cplusplus.github.io/CWG/issues/912.html>) | C++98 | literal de caractere comum não codificável era não especificado | especificado como suportado condicionalmente
[CWG 1024](<https://cplusplus.github.io/CWG/issues/1024.html>) | C++98 | literal multicaractere era exigido ser suportado | tornou-se suportado condicionalmente
[CWG 1656](<https://cplusplus.github.io/CWG/issues/1656.html>) | C++98 | o significado da sequência de escape numérica em um literal de caractere era incerto | especificado
[P1854R4](<https://wg21.link/P1854R4>) | C++98 | literais de caractere não codificáveis eram suportados condicionalmente | o programa é malformado

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 5.13.3 Literais de caractere [lex.ccon]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 5.13.3 Literais de caractere [lex.ccon]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 5.13.3 Literais de caractere [lex.ccon]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 2.14.3 Literais de caractere [lex.ccon]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 2.14.3 Literais de caractere [lex.ccon]

  * Padrão C++03 (ISO/IEC 14882:2003):

    

  * 2.13.2 Literais de caractere [lex.ccon]

  * Padrão C++98 (ISO/IEC 14882:1998):

    

  * 2.13.2 Literais de caractere [lex.ccon]

### Veja também

[ literais definidos pelo usuário](<#/doc/language/user_literal>)(C++11) | literais com sufixo definido pelo usuário
[documentação C](<#/>) para constante de caractere