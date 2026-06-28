# std::bitset&lt;N&gt;::bitset

```cpp
bitset(); | (1) | (noexcept desde C++11)
(constexpr desde C++11)
  // (2)
bitset( unsigned long val ); | | (ate C++11)
constexpr bitset( unsigned long long val ) noexcept;  // (desde C++11)
template< class CharT, class Traits, class Alloc >
explicit bitset
( const std::basic_string<CharT, Traits, Alloc>& str,
typename std::basic_string
<CharT, Traits, Alloc>::size_type pos = 0,
typename std::basic_string<CharT, Traits, Alloc>::size_type
n = std::basic_string<CharT, Traits, Alloc>::npos,
CharT zero = CharT('0'), CharT one = CharT('1') ); | (3) | (constexpr desde C++23)
template< class CharT, class Traits >
constexpr explicit bitset
( std::basic_string_view<CharT, Traits> str,
std::size_t pos = 0, std::size_t n = std::size_t(-1),
CharT zero = CharT('0'), CharT one = CharT('1') );  // (4) (desde C++26)
template< class CharT >
explicit bitset( const CharT* str, std::size_t n = std::size_t(-1),
CharT zero = CharT('0'), CharT one = CharT('1') );  // (5) (desde C++11)
(constexpr desde C++23)
```

Constrói um novo bitset a partir de uma das várias fontes de dados opcionais:

1) Construtor padrão. Constrói um bitset com todos os bits definidos como zero.

2) Constrói um bitset a partir de um inteiro sem sinal val.

Dado o número de bits na [representação de valor](<#/doc/language/objects>) de unsigned long(ate C++11)unsigned long long(desde C++11) como S:

  * As primeiras (mais à direita, menos significativas) [std::min](<#/doc/algorithm/min>)(S, N) posições de bit são inicializadas com os valores de bit correspondentes de val.
  * Se S for menor que N, as posições de bit restantes são inicializadas com zeros.

3) Constrói um bitset usando os caracteres em str. Uma posição inicial opcional pos e um comprimento n podem ser fornecidos, bem como caracteres que denotam valores alternativos para bits definidos (one) e não definidos (zero). `Traits::eq()` é usado para comparar os valores dos caracteres.

O comprimento efetivo da string de inicialização é [std::min](<#/doc/algorithm/min>)(n, str.size() - pos).

4) Semelhante a (3), mas usa um [std::basic_string_view](<#/doc/string/basic_string_view>) em vez de um [std::basic_string](<#/doc/string/basic_string>).

5) Semelhante a (3), mas usa um const CharT* em vez de um [std::basic_string](<#/doc/string/basic_string>). Equivalente a bitset(n == [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;::npos
? [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;(str)
: [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;(str, n), 0, n, zero, one). | (ate C++26)
Equivalente a bitset(n == [std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt;::npos
? [std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt;(str)
: [std::basic_string_view](<#/doc/string/basic_string_view>)&lt;CharT&gt;(str, n), 0, n, zero, one). | (desde C++26)

### Parâmetros

- **val** — número usado para inicializar o bitset
- **str** — string usada para inicializar o bitset
- **pos** — um deslocamento inicial em str
- **n** — número de caracteres a serem usados de str
- **zero** — caractere alternativo para bits não definidos em str
- **one** — caractere alternativo para bits definidos em str

### Exceções

3,4) [std::out_of_range](<#/doc/error/out_of_range>) se pos > str.size(), [std::invalid_argument](<#/doc/error/invalid_argument>) se qualquer caractere não for one ou zero.

5) [std::invalid_argument](<#/doc/error/invalid_argument>) se qualquer caractere não for one ou zero.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_constexpr_bitset`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Um `std::bitset` mais constexpr, sobrecargas ([3,5](<#/doc/utility/bitset/bitset>))
[`__cpp_lib_bitset`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Interface de `std::bitset` com [std::string_view](<#/doc/string/basic_string_view>), ([4](<#/doc/utility/bitset/bitset>))

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <climits>
    #include <iostream>
    #include <string>
    
    int main()
    {
        // empty constructor (1)
        std::bitset<8> b1; // [0,0,0,0,0,0,0,0]
    
        // unsigned long long constructor (2)
        std::bitset<8> b2(42);          // [0,0,1,0,1,0,1,0]
        std::bitset<70> bl(ULLONG_MAX); // [0,0,0,0,0,0,1,1,1,...,1,1,1] in C++11
        std::bitset<8> bs(0xfff0);      // [1,1,1,1,0,0,0,0]
    
        // string constructor (3)
        std::string bit_string = "110010";
        std::bitset<8> b3(bit_string);       // [0,0,1,1,0,0,1,0]
        std::bitset<8> b4(bit_string, 2);    // [0,0,0,0,0,0,1,0]
        std::bitset<8> b5(bit_string, 2, 3); // [0,0,0,0,0,0,0,1]
    
        // string constructor using custom zero/one digits (3)
        std::string alpha_bit_string = "aBaaBBaB";
        std::bitset<8> b6(alpha_bit_string, 0, alpha_bit_string.size(),
                          'a', 'B');         // [0,1,0,0,1,1,0,1]
    
        // char* constructor using custom digits (5)
        std::bitset<8> b7("XXXXYYYY", 8, 'X', 'Y'); // [0,0,0,0,1,1,1,1]
    
        std::cout <<   "b1: " << b1 << "\nb2: " << b2 << "\nbl: " << bl
                  << "\nbs: " << bs << "\nb3: " << b3 << "\nb4: " << b4
                  << "\nb5: " << b5 << "\nb6: " << b6 << "\nb7: " << b7 << '\n';
    }
```

Saída possível:
```
    b1: 00000000
    b2: 00101010
    bl: 0000001111111111111111111111111111111111111111111111111111111111111111
    bs: 11110000
    b3: 00110010
    b4: 00000010
    b5: 00000001
    b6: 01001101
    b7: 00001111
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 396](<https://cplusplus.github.io/LWG/issue396>) | C++98 | os valores dos caracteres zero e one para a sobrecarga (3) eram ​0​ e 1 (que não correspondem a '0' e '1') | parâmetros adicionados para fornecer valores para esses caracteres
[LWG 457](<https://cplusplus.github.io/LWG/issue457>) | C++98 | S era [CHAR_BIT](<#/doc/types/climits>) * sizeof(unsigned long) para a sobrecarga (2), mas unsigned long não é garantido usar todos os seus bits para representar seu valor | considerar o número de bits da representação de valor em vez disso
[LWG 2250](<https://cplusplus.github.io/LWG/issue2250>) | C++98 | o comportamento era indefinido se pos > str.size() fosse verdadeiro | sempre lança uma exceção neste caso

### Veja também

[ set](<#/doc/utility/bitset/set>) | define bits como true ou um valor dado
(função membro pública)
[ reset](<#/doc/utility/bitset/reset>) | define bits como false
(função membro pública)