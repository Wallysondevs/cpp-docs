# std::basic_syncbuf

Definido no cabeçalho `[<syncstream>](<#/doc/header/syncstream>)`

```c
template<
class CharT,
class Traits = std::char_traits<CharT>,
class Allocator = std::allocator<CharT>
> class basic_syncbuf : public std::basic_streambuf<CharT, Traits>
```

`std::basic_syncbuf` é um wrapper para um [std::basic_streambuf](<#/doc/io/basic_streambuf>) (fornecido no momento da construção como um ponteiro). Ele acumula a saída em seu próprio buffer interno e transmite atomicamente todo o seu conteúdo para o buffer encapsulado na destruição e quando explicitamente solicitado, de modo que apareçam como uma sequência contígua de caracteres. Ele garante que não há condições de corrida (data races) e nenhuma intercalação de caracteres enviados para o buffer encapsulado, desde que todas as outras saídas feitas para o mesmo buffer sejam feitas através de instâncias, possivelmente diferentes, de `std::basic_syncbuf`.

Uma implementação típica de `std::basic_syncbuf` mantém um ponteiro para o [std::basic_streambuf](<#/doc/io/basic_streambuf>) encapsulado, uma flag booleana indicando se o buffer transmitirá seu conteúdo para o buffer encapsulado na sincronização (flush), uma flag booleana indicando um flush pendente quando a política é não emitir na sincronização, um buffer interno que usa `Allocator` (como [std::string](<#/doc/string/basic_string>)), e um ponteiro para um mutex usado para sincronizar a emissão entre múltiplas threads acessando o mesmo stream buffer encapsulado (esses mutexes podem estar em um hash map com ponteiros para objetos [std::basic_streambuf](<#/doc/io/basic_streambuf>) usados como chaves).

Assim como outras classes streambuf, `std::basic_syncbuf` é normalmente acessado apenas através do stream correspondente, [`std::osyncstream`](<#/doc/io/basic_osyncstream>), e não diretamente.

Vários typedefs para tipos de caracteres comuns são fornecidos:

Definido no cabeçalho `[<syncstream>](<#/doc/header/syncstream>)`
---
Tipo | Definição
---|---
`std::syncbuf` | std::basic_syncbuf&lt;char&gt;
`std::wsyncbuf` | std::basic_syncbuf<wchar_t>

### Tipos de membro

Tipo de membro | Definição
---|---
`char_type` | `CharT`
`traits_type` | `Traits`; o programa é malformado se `Traits::char_type` não for `CharT`.
`int_type` | `Traits::int_type`
`pos_type` | `Traits::pos_type`
`off_type` | `Traits::off_type`
`allocator_type` | `Allocator`
`streambuf_type` | [std::basic_streambuf](<#/doc/io/basic_streambuf>)<CharT, Traits>

### Funções membro

### Funções membro públicas

---
[ (construtor)](<#/doc/io/basic_syncbuf/basic_syncbuf>) | constrói um objeto `basic_syncbuf`
(função membro pública)
[ operator=](<#/>) | atribui um objeto `basic_syncbuf`
(função membro pública)
[ swap](<#/doc/io/basic_syncbuf/swap>) | troca dois objetos `basic_syncbuf`
(função membro pública)
[ (destrutor)](<#/doc/io/basic_syncbuf/~basic_syncbuf>) | destrói o `basic_syncbuf` e emite seu buffer interno
(função membro pública)
[ emit](<#/doc/io/basic_syncbuf/emit>) | transmite atomicamente todo o buffer interno para o streambuf encapsulado
(função membro pública)
[ get_wrapped](<#/doc/io/basic_syncbuf/get_wrapped>) | recupera o ponteiro do streambuf encapsulado
(função membro pública)
[ get_allocator](<#/doc/io/basic_syncbuf/get_allocator>) | recupera o allocator usado por este `basic_syncbuf`
(função membro pública)
[ set_emit_on_sync](<#/doc/io/basic_syncbuf/set_emit_on_sync>) | altera a política atual de emissão na sincronização
(função membro pública)

### Funções membro protegidas

[ sync](<#/doc/io/basic_syncbuf/sync>) | emite, ou registra um flush pendente, dependendo da política atual de emissão na sincronização
(função membro pública)

### Funções não-membro

[ std::swap(std::basic_syncbuf)](<#/doc/io/basic_syncbuf/swap2>)(C++20) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
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

[ pubimbue](<#/doc/io/basic_streambuf/pubimbue>) | altera o locale associado e invoca imbue()
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
[ sungetc](<#/doc/io/basic_streambuf/sungetc>) | move o próximo ponteiro na sequência de entrada para trás em uma posição
(função membro pública de `std::basic_streambuf<CharT,Traits>`)

### Funções membro protegidas

[ (construtor)](<#/doc/io/basic_streambuf/basic_streambuf>) | constrói um objeto `basic_streambuf`
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
[ seekoff](<#/doc/io/basic_streambuf/pubseekoff>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambos, usando endereçamento relativo
(função membro protegida virtual de `std::basic_streambuf<CharT,Traits>`)
[ seekpos](<#/doc/io/basic_streambuf/pubseekpos>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambos, usando endereçamento absoluto
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
[ overflow](<#/doc/io/basic_streambuf/overflow>)[virtual] | escreve caracteres da sequência de saída associada para a área de escrita
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

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_syncbuf`](<#/doc/utility/feature_test>) | [`201803L`](<#/>) | (C++20) | Ostream com buffer sincronizado ([`std::syncbuf`](<#/doc/io/basic_syncbuf>), std::osyncstream) e manipuladores