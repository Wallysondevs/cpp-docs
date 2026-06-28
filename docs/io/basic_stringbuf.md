# std::basic_stringbuf

Definido no cabeçalho `[<sstream>](<#/doc/header/sstream>)`

```c
template<
class CharT,
class Traits = std::char_traits<CharT>,
class Allocator = std::allocator<CharT>
> class basic_stringbuf
: public std::basic_streambuf<CharT, Traits>
```

`std::basic_stringbuf` é um [std::basic_streambuf](<#/doc/io/basic_streambuf>) cuja sequência de caracteres associada é uma sequência de caracteres arbitrários residente em memória, que pode ser inicializada a partir de ou disponibilizada como uma instância de [std::basic_string](<#/doc/string/basic_string>).

Implementações típicas de `std::basic_stringbuf` mantêm um objeto do tipo [std::basic_string](<#/doc/string/basic_string>) ou um container de sequência redimensionável equivalente diretamente como um membro de dados e o utilizam tanto como a sequência de caracteres controlada (o array para onde os seis ponteiros de [std::basic_streambuf](<#/doc/io/basic_streambuf>) apontam) quanto como a sequência de caracteres associada (a fonte de caracteres para todas as operações de entrada e o alvo para a saída).

Além disso, uma implementação típica mantém um membro de dados do tipo [std::ios_base::openmode](<#/doc/io/ios_base/openmode>) para indicar o modo de E/S do stream associado (somente entrada, somente saída, entrada/saída, no final, etc).

Se a estratégia de superalocação for usada por [overflow()](<#/doc/io/basic_stringbuf/overflow>), um ponteiro de marca d'água superior adicional pode ser armazenado para rastrear o último caractere inicializado. | (desde C++11)

Vários typedefs para tipos de caracteres comuns são fornecidos:

Definido no cabeçalho `[<sstream>](<#/doc/header/sstream>)`
---
Tipo | Definição
---|---
`std::stringbuf` | std::basic_stringbuf&lt;char&gt;
`std::wstringbuf` | std::basic_stringbuf<wchar_t>

### Tipos de membro

Tipo de membro | Definição
---|---
`char_type` | `CharT`
`traits_type` | `Traits`; o programa é malformado se `Traits::char_type` não for `CharT`.
`int_type` | `Traits::int_type`
`pos_type` | `Traits::pos_type`
`off_type` | `Traits::off_type`
`allocator_type` | `Allocator`

### Membros apenas para exposição

`_buf_` | o [std::basic_string](<#/doc/string/basic_string>)<CharT, Traits, Allocator> usado como o buffer subjacente
(objeto membro apenas para exposição*)
`_mode_` | o [std::ios_base::openmode](<#/doc/io/ios_base/openmode>) do stream associado
(objeto membro apenas para exposição*)
[_init_buf_ptrs_](<#/doc/io/basic_stringbuf/init_buf_ptrs>) | inicializa as sequências de entrada e saída
(função membro apenas para exposição*)

### Funções membro públicas

[ (construtor)](<#/doc/io/basic_stringbuf/basic_stringbuf>) | constrói um objeto `basic_stringbuf`
(função membro pública)
[ operator=](<#/>)(desde C++11) | atribui um objeto `basic_stringbuf`
(função membro pública)
[ swap](<#/doc/io/basic_stringbuf/swap>)(desde C++11) | troca dois objetos `basic_stringbuf`
(função membro pública)
(destrutor)[virtual] (implicitamente declarado) | destrói um objeto `basic_stringbuf` e a string que ele contém
(função membro pública virtual)
[ str](<#/doc/io/basic_stringbuf/str>) | substitui ou obtém uma cópia da string de caracteres associada
(função membro pública)
[ get_allocator](<#/doc/io/basic_stringbuf/get_allocator>)(C++20) | obtém uma cópia do alocador associado ao container de sequência interno
(função membro pública)
[ view](<#/doc/io/basic_stringbuf/view>)(C++20) | obtém uma view sobre a sequência de caracteres subjacente
(função membro pública)

### Funções membro protegidas

[ underflow](<#/doc/io/basic_stringbuf/underflow>)[virtual] | retorna o próximo caractere disponível na sequência de entrada
(função membro protegida virtual)
[ pbackfail](<#/doc/io/basic_stringbuf/pbackfail>)[virtual] | coloca um caractere de volta na sequência de entrada
(função membro protegida virtual)
[ overflow](<#/doc/io/basic_stringbuf/overflow>)[virtual] | anexa um caractere à sequência de saída
(função membro protegida virtual)
[ setbuf](<#/doc/io/basic_stringbuf/setbuf>)[virtual] | tenta substituir a sequência de caracteres controlada por um array
(função membro protegida virtual)
[ seekoff](<#/doc/io/basic_stringbuf/seekoff>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo
(função membro protegida virtual)
[ seekpos](<#/doc/io/basic_stringbuf/seekpos>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento absoluto
(função membro protegida virtual)

### Funções não-membro

[ std::swap(std::basic_stringbuf)](<#/doc/io/basic_stringbuf/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
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

[ (destrutor)](<#/doc/io/basic_streambuf/~basic_streambuf>)[virtual] | destrói o objeto `basic_streambuf`
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
[ sbumpc](<#/doc/io/basic_streambuf/sbumpc>)(removido em C++17) | lê um caractere da sequência de entrada e avança a sequência
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

##### Devolução

[ sputbackc](<#/doc/io/basic_streambuf/sputbackc>) | coloca um caractere de volta na sequência de entrada
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ sungetc](<#/doc/io/basic_streambuf/sungetc>) | move o próximo ponteiro na sequência de entrada para trás em um
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

### Funções membro protegidas

[ (construtor)](<#/doc/io/basic_streambuf/basic_streambuf>) | constrói um objeto `basic_streambuf`
(função membro protegida)
[ operator=](<#/>)(desde C++11) | substitui um objeto `basic_streambuf`
(função membro protegida)
[ swap](<#/doc/io/basic_streambuf/swap>)(desde C++11) | troca dois objetos `basic_streambuf`
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

##### Devolução

[ pbackfail](<#/doc/io/basic_streambuf/pbackfail>)[virtual] | coloca um caractere de volta na sequência de entrada, possivelmente modificando a sequência de entrada
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)