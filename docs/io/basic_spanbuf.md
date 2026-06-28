# std::basic_spanbuf

Definido no cabeçalho `[<spanstream>](<#/doc/header/spanstream>)`

```c
template<
class CharT,
class Traits = std::char_traits<CharT>
> class basic_spanbuf
: public std::basic_streambuf<CharT, Traits>
```

`std::basic_spanbuf` é um [std::basic_streambuf](<#/doc/io/basic_streambuf>) cuja sequência de caracteres associada é uma sequência de caracteres arbitrários residente em memória, que pode ser inicializada a partir de ou disponibilizada como uma instância de [std::span](<#/doc/container/span>)&lt;CharT&gt;.

`std::basic_spanbuf` realiza E/S em um buffer fixo e, portanto, não tenta obter um novo buffer quando o buffer subjacente está esgotado.

Vários typedefs para tipos de caracteres comuns são fornecidos:

Definido no cabeçalho `[<spanstream>](<#/doc/header/spanstream>)`
---
Tipo | Definição
---|---
`std::spanbuf` | std::basic_spanbuf&lt;char&gt;
`std::wspanbuf` | std::basic_spanbuf<wchar_t>

### Tipos de membro

Tipo de membro | Definição
---|---
`char_type` | `CharT`
`traits_type` | `Traits`; o programa é malformado se `Traits::char_type` não for `CharT`.
`int_type` | `Traits::int_type`
`pos_type` | `Traits::pos_type`
`off_type` | `Traits::off_type`

### Membros de dados

Nome do membro | Definição
---|---
`_mod_` (private) | Um [std::ios_base::openmode](<#/doc/io/ios_base/openmode>) registrando o modo de abertura.
(objeto membro apenas para exposição*)
`_buf_` (private) | Um [std::span](<#/doc/container/span>)&lt;CharT&gt; referenciando o buffer subjacente.
(objeto membro apenas para exposição*)

### Funções membro

##### Funções membro públicas

---
[ (constructor)](<#/doc/io/basic_spanbuf/basic_spanbuf>) | constrói um objeto `basic_spanbuf`
(função membro pública)
**(destructor)**[virtual] | destrói o objeto `basic_spanbuf`
(função membro pública virtual)
[ operator=](<#/>) | atribui um objeto `basic_spanbuf`
(função membro pública)
[ swap](<#/doc/io/basic_spanbuf/swap>) | troca dois objetos `basic_spanbuf`
(função membro pública)
[ span](<#/doc/io/basic_spanbuf/span>) | obtém ou inicializa um buffer subjacente de acordo com o modo
(função membro pública)

##### Funções membro protegidas

[ setbuf](<#/doc/io/basic_spanbuf/setbuf>)[virtual] | tenta substituir a sequência de caracteres controlada por um array
(função membro protegida virtual)
[ seekoff](<#/doc/io/basic_spanbuf/seekoff>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo
(função membro protegida virtual)
[ seekpos](<#/doc/io/basic_spanbuf/seekpos>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento absoluto
(função membro protegida virtual)

### Funções não-membro

[ std::swap(std::basic_spanbuf)](<#/doc/io/basic_spanbuf/swap2>)(C++23) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)

## Herdado de [std::basic_streambuf](<#/doc/io/basic_streambuf>)

### Tipos de membro

Tipo de membro | Definição
---|---
`char_type` | `CharT`
`traits_type` | `Traits`; o programa é malformado se `Traits::char_type` não for `CharT`.
`int_type` | `Traits::int_type`
`pos_type` | `Traits::pos_type`
`off_type` | `Traits::off_type`

### Funções membro

[ (destructor)](<#/doc/io/basic_streambuf/~basic_streambuf>)[virtual] | destrói o objeto `basic_streambuf`
(função membro pública virtual de `std::basic_streambuf<CharT,Traits>`)

##### Locales

[ pubimbue](<#/doc/io/basic_streambuf/pubimbue>) | muda o locale associado e invoca imbue()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ getloc](<#/doc/io/basic_streambuf/getloc>) | obtém uma cópia do locale associado
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

##### Posicionamento

[ pubsetbuf](<#/doc/io/basic_streambuf/pubsetbuf>) | invoca setbuf()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ pubseekoff](<#/doc/io/basic_streambuf/pubseekoff>) | invoca seekoff()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ pubseekpos](<#/doc/io/basic_streambuf/pubseekpos>) | invoca seekpos()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ pubsync](<#/doc/io/basic_streambuf/pubsync>) | invoca sync()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

##### Área de leitura

[ in_avail](<#/doc/io/basic_streambuf/in_avail>) | obtém o número de caracteres imediatamente disponíveis na área de leitura
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ snextc](<#/doc/io/basic_streambuf/snextc>) | avança a sequência de entrada, então lê um caractere sem avançar novamente
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sbumpcstossc](<#/doc/io/basic_streambuf/sbumpc>)(removido em C++17) | lê um caractere da sequência de entrada e avança a sequência
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sgetc](<#/doc/io/basic_streambuf/sgetc>) | lê um caractere da sequência de entrada sem avançar a sequência
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sgetn](<#/doc/io/basic_streambuf/sgetn>) | invoca xsgetn()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

##### Área de escrita

[ sputc](<#/doc/io/basic_streambuf/sputc>) | escreve um caractere na área de escrita e avança o próximo ponteiro
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sputn](<#/doc/io/basic_streambuf/sputn>) | invoca xsputn()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

##### Retorno

[ sputbackc](<#/doc/io/basic_streambuf/sputbackc>) | coloca um caractere de volta na sequência de entrada
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sungetc](<#/doc/io/basic_streambuf/sungetc>) | move o próximo ponteiro na sequência de entrada para trás em um
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

### Funções membro protegidas

[ (constructor)](<#/doc/io/basic_streambuf/basic_streambuf>) | constrói um objeto `basic_streambuf`
(função membro protegida)
[ operator=](<#/>)(C++11) | substitui um objeto `basic_streambuf`
(função membro protegida)
[ swap](<#/doc/io/basic_streambuf/swap>)(C++11) | troca dois objetos `basic_streambuf`
(função membro protegida)

##### Locales

[ imbue](<#/doc/io/basic_streambuf/pubimbue>)[virtual] | reage a uma mudança do locale associado
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)

##### Posicionamento

[ setbuf](<#/doc/io/basic_streambuf/pubsetbuf>)[virtual] | substitui o buffer por um array definido pelo usuário, se permitido
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ seekoff](<#/doc/io/basic_streambuf/pubseekoff>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ seekpos](<#/doc/io/basic_streambuf/pubseekpos>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento absoluto
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ sync](<#/doc/io/basic_streambuf/pubsync>)[virtual] | sincroniza os buffers com a sequência de caracteres associada
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)

##### Área de leitura

[ showmanyc](<#/doc/io/basic_streambuf/showmanyc>)[virtual] | obtém o número de caracteres disponíveis para entrada na sequência de entrada associada, se conhecido
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ underflow](<#/doc/io/basic_streambuf/underflow>)[virtual] | lê caracteres da sequência de entrada associada para a área de leitura
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ uflow](<#/doc/io/basic_streambuf/uflow>)[virtual] | lê caracteres da sequência de entrada associada para a área de leitura e avança o próximo ponteiro
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ xsgetn](<#/doc/io/basic_streambuf/sgetn>)[virtual] | lê múltiplos caracteres da sequência de entrada
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ ebackgptregptr](<#/doc/io/basic_streambuf/gptr>) | retorna um ponteiro para o início, caractere atual e o fim da área de leitura
(função membro protegida)
[ gbump](<#/doc/io/basic_streambuf/gbump>) | avança o próximo ponteiro na sequência de entrada
(função membro protegida)
[ setg](<#/doc/io/basic_streambuf/setg>) | reposiciona os ponteiros de início, próximo e fim da sequência de entrada
(função membro protegida)

##### Área de escrita

[ xsputn](<#/doc/io/basic_streambuf/sputn>)[virtual] | escreve múltiplos caracteres na sequência de saída
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ overflow](<#/doc/io/basic_streambuf/overflow>)[virtual] | escreve caracteres da área de escrita para a sequência de saída associada
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ pbasepptrepptr](<#/doc/io/basic_streambuf/pptr>) | retorna um ponteiro para o início, caractere atual e o fim da área de escrita
(função membro protegida)
[ pbump](<#/doc/io/basic_streambuf/pbump>) | avança o próximo ponteiro da sequência de saída
(função membro protegida)
[ setp](<#/doc/io/basic_streambuf/setp>) | reposiciona os ponteiros de início, próximo e fim da sequência de saída
(função membro protegida)

##### Retorno

[ pbackfail](<#/doc/io/basic_streambuf/pbackfail>)[virtual] | coloca um caractere de volta na sequência de entrada, possivelmente modificando a sequência de entrada
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)

### Notas

`std::basic_spanbuf` não possui o buffer subjacente.

É responsabilidade dos programadores garantir que o buffer subjacente esteja em seu tempo de vida quando usado por um objeto `std::basic_spanbuf`. Sincronização adicional pode ser necessária se mais de uma thread operar o mesmo buffer subjacente através de diferentes objetos `std::basic_spanbuf`.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_spanstream`](<#/doc/feature_test>) | [`202106L`](<#/>) | (C++23) | [`std::spanbuf`](<#/doc/io/basic_spanbuf>), std::spanstream

### Veja também

[ basic_stringbuf](<#/doc/io/basic_stringbuf>) | implementa um dispositivo de string bruto
(modelo de classe)
[ strstreambuf](<#/doc/io/strstreambuf>)(obsoleto em C++98)(removido em C++26) | implementa um dispositivo de array de caracteres bruto
(classe)