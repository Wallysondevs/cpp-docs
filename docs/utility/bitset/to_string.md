# std::bitset&lt;N&gt;::to_string

```cpp
  // (1)
template< class CharT, class Traits, class Allocator >
std::basic_string<CharT, Traits, Allocator>
to_string( CharT zero = CharT('0'),
CharT one = CharT('1') ) const; |  | (ate C++11)
template<
class CharT = char,
class Traits = std::char_traits<CharT>,
class Allocator = std::allocator<CharT>
```
>  
```cpp
std::basic_string<CharT, Traits, Allocator>
to_string( CharT zero = CharT('0'),
CharT one = CharT('1') ) const;  // (desde C++11)
(constexpr desde C++23)
template< class CharT, class Traits >
std::basic_string<CharT, Traits>
to_string( CharT zero = CharT('0'),
CharT one = CharT('1') ) const; |  (2) | (ate C++11)
template< class CharT >
std::basic_string<CharT> to_string( CharT zero = CharT('0'),
CharT one = CharT('1') ) const; |  (3)  |  (ate C++11)
std::string to_string( char zero = '0', char one = '1' ) const; |  (4)  |  (ate C++11)
```

  
Converte o conteúdo do bitset para uma string. Usa `zero` para representar bits com valor `false` e `one` para representar bits com valor `true`.

A string resultante contém N caracteres, onde o primeiro caractere corresponde ao último bit (N-1) e o último caractere corresponde ao primeiro bit.

Todos os argumentos de tipo de template precisam ser fornecidos porque templates de função não podem ter argumentos de template padrão. As sobrecargas (2-4) são fornecidas para simplificar as invocações de `to_string`: 2) Usa o alocador padrão [std::allocator](<#/doc/memory/allocator>). 3) Usa a característica de caractere padrão [std::char_traits](<#/doc/string/char_traits>) e o alocador padrão [std::allocator](<#/doc/memory/allocator>). 4) Usa o tipo de caractere padrão `char`, a característica de caractere padrão [std::char_traits](<#/doc/string/char_traits>) e o alocador padrão [std::allocator](<#/doc/memory/allocator>). | (ate C++11)  
  
### Parâmetros

zero  |  \-  |  caractere a ser usado para representar false  
---|---|---
one  |  \-  |  caractere a ser usado para representar true  
  
### Valor de retorno

1) A string convertida.

2) to_string<CharT, Traits, [std::allocator](<#/doc/memory/allocator>)&lt;CharT&gt;>(zero, one).

3) to_string<CharT, [std::char_traits](<#/doc/string/char_traits>)&lt;CharT&gt;, [std::allocator](<#/doc/memory/allocator>)&lt;CharT&gt;>(zero, one).

4) to_string<char, [std::char_traits](<#/doc/string/char_traits>)&lt;char&gt;, [std::allocator](<#/doc/memory/allocator>)&lt;char&gt;>(zero, one).

### Exceções

Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) do construtor de [std::basic_string](<#/doc/string/basic_string>). 

### Observações

Desde C++11, templates de função podem ter argumentos de template padrão. [LWG issue 1113](<https://cplusplus.github.io/LWG/issue1113>) removeu as sobrecargas auxiliares ([2-4](<#/doc/utility/bitset/to_string>)) e adicionou os argumentos de template padrão correspondentes em ([1](<#/doc/utility/bitset/to_string>)). 

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <iostream>
     
    int main()
    {
        std::bitset<8> b{42};
        std::cout << b.to_string() << '\n'
                  << b.to_string('*') << '\n'
                  << b.to_string('O', 'X') << '\n';
    }
```

Saída: 
```
    00101010
    **1*1*1*
    OOXOXOXO
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 396](<https://cplusplus.github.io/LWG/issue396>) | C++98  | bits zero e um eram convertidos para os caracteres ​0​  
e 1 (que não correspondem a '0' e '1')  | adicionados parâmetros para fornecer  
valores para esses caracteres   
[LWG 434](<https://cplusplus.github.io/LWG/issue434>) | C++98  | todos os argumentos de template precisavam ser fornecidos  | adicionadas sobrecargas ([2-4](<#/doc/utility/bitset/to_string>))  
[LWG 853](<https://cplusplus.github.io/LWG/issue853>) | C++98  | sobrecargas ([2-4](<#/doc/utility/bitset/to_string>)) não tinham os  
argumentos padrão adicionados por [LWG issue 396](<https://cplusplus.github.io/LWG/issue396>) | também adicionados   
  
### Veja também

[ to_ulong](<#/doc/utility/bitset/to_ulong>) |  retorna uma representação inteira unsigned long dos dados   
(função membro pública)  
[ to_ullong](<#/doc/utility/bitset/to_ullong>)(C++11) |  retorna uma representação inteira unsigned long long dos dados   
(função membro pública)