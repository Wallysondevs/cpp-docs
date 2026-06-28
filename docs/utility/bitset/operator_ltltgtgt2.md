# operator&lt;&lt;,&gt;&gt;(std::bitset)

Definido no cabeçalho `[<bitset>](<#/doc/header/bitset>)`

```c
template< class CharT, class Traits, std::size_t N >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os, const std::bitset<N>& x );
template< class CharT, class Traits, std::size_t N >
std::basic_istream<CharT, Traits>&
operator>>( std::basic_istream<CharT, Traits>& is, std::bitset<N>& x );
```

Insere ou extrai um bitset de um stream de caracteres.

1) Escreve o bitset x para o stream de caracteres os como se primeiro o convertesse para um [std::basic_string](<#/doc/string/basic_string>)<CharT, Traits> usando [to_string()](<#/doc/utility/bitset/to_string>), e então o escrevesse em os usando o [`operator<<`](<#/doc/string/basic_string/operator_ltltgtgt>) (que é uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>) para strings).
Os caracteres a serem usados para uns e zeros são obtidos do locale atualmente imbuído chamando [std::use_facet](<#/doc/locale/use_facet>)<[std::ctype](<#/doc/locale/ctype>)&lt;CharT&gt;>(os.getloc()).widen() com '1' e '0' como argumentos.

2) Comporta-se como uma [FormattedInputFunction](<#/doc/named_req/FormattedInputFunction>). Após construir e verificar o objeto sentinela, que pode pular espaços em branco iniciais, extrai até N caracteres de is e armazena os caracteres no bitset x.
Caracteres são extraídos até que uma das seguintes condições seja atendida:

  * N caracteres tenham sido lidos,
  * o fim do arquivo ocorra em is, ou
  * o próximo caractere não seja is.widen('0') nem is.widen('1').

Se N > 0 e nenhum caractere for extraído, is.setstate(ios_base::failbit) é chamado.

### Parâmetros

- **os** — o stream de caracteres para o qual escrever
- **is** — o stream de caracteres do qual ler
- **x** — o bitset a ser lido ou escrito

### Valor de retorno

1) os

2) is

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <iostream>
    #include <sstream>
    
    int main()
    {
        std::string bit_string = "001101";
        std::istringstream bit_stream(bit_string);
    
        std::bitset<3> b1;
        bit_stream >> b1; // reads "001", stream still holds "101"
        std::cout << b1 << '\n';
    
        std::bitset<8> b2;
        bit_stream >> b2; // reads "101", populates the 8-bit set as "00000101"
        std::cout << b2 << '\n';
    }
```

Saída:
```
    001
    00000101
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 303](<https://cplusplus.github.io/LWG/issue303>) | C++98 | caracteres de byte único eram extraídos de is, mas `CharT` pode ter múltiplos bytes | extrai `CharT` e o compara com '0' e '1' expandidos
[LWG 396](<https://cplusplus.github.io/LWG/issue396>) | C++98 | o conteúdo escrito por operator<< era independente do locale | escreve '0's e '1's expandidos
[LWG 3199](<https://cplusplus.github.io/LWG/issue3199>) | C++98 | extrair um `std::bitset<0>` sempre definia `failbit` | tal extração nunca define `failbit`

### Veja também

[ operator<<=operator>>=operator<&lt;operator&gt;>](<#/doc/utility/bitset/operator_ltltgtgt>) | realiza deslocamento binário para a esquerda e para a direita
(função membro pública)