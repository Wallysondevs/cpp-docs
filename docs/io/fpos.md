# std::fpos

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
template< class State >
class fpos;
```

Especializações do template de classe `std::fpos` identificam posições absolutas em um stream ou em um arquivo. Cada objeto do tipo `fpos` armazena a posição do byte no stream (tipicamente como um membro privado do tipo [std::streamoff](<#/doc/io/streamoff>)) e o estado de deslocamento atual, um valor do tipo `State` (tipicamente [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)).

Os seguintes nomes de typedef para std::fpos<[std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> são fornecidos (embora sejam escritos de forma diferente no padrão, eles denotam o mesmo tipo):

Definido no cabeçalho `[<iosfwd>](<#/doc/header/iosfwd>)`
---
Tipo | Definição
---|---
`std::streampos` | std::fpos<[std::char_traits](<#/doc/string/char_traits>)&lt;char&gt;::state_type>
`std::wstreampos` | std::fpos<[std::char_traits](<#/doc/string/char_traits>)<wchar_t>::state_type>
`std::u8streampos`(C++20) | std::fpos<[std::char_traits](<#/doc/string/char_traits>)<char8_t>::state_type>
`std::u16streampos` (desde C++11) | std::fpos<[std::char_traits](<#/doc/string/char_traits>)<char16_t>::state_type>
`std::u32streampos` (desde C++11) | std::fpos<[std::char_traits](<#/doc/string/char_traits>)<char32_t>::state_type>

Todas as especializações de `fpos` atendem aos requisitos [DefaultConstructible](<#/doc/named_req/DefaultConstructible>), [CopyConstructible](<#/doc/named_req/CopyConstructible>), [CopyAssignable](<#/doc/named_req/CopyAssignable>), [Destructible](<#/doc/named_req/Destructible>) e [EqualityComparable](<#/doc/named_req/EqualityComparable>).

Se `State` for trivialmente copy constructible, `fpos` possui um construtor de cópia trivial. Se `State` for trivialmente copy assignable, `fpos` possui um operador de atribuição de cópia trivial. Se `State` for trivialmente destructible, `fpos` possui um destrutor trivial.

### Parâmetro de template

- **State** — o tipo que representa o estado de deslocamento
Requisitos de tipo |
---|---
-`State` deve atender aos requisitos de [Destructible](<#/doc/named_req/Destructible>), [CopyAssignable](<#/doc/named_req/CopyAssignable>), [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [DefaultConstructible](<#/doc/named_req/DefaultConstructible>). |

### Funções membro

[ state](<#/doc/io/fpos/state>) | obtém/define o valor do estado de deslocamento
---|---
(função membro pública) |

Além disso, funções membro e não-membro são fornecidas para suportar as seguintes operações:

*   Um construtor padrão que armazena um offset de zero e inicializa por valor o objeto de estado.

*   Um construtor não-explícito que aceita um argumento do tipo (possivelmente const) [std::streamoff](<#/doc/io/streamoff>), que armazena esse offset e inicializa por valor o objeto de estado. Este construtor também deve aceitar o valor especial [std::streamoff](<#/doc/io/streamoff>)(-1): o `std::fpos` construído desta maneira é retornado por algumas operações de stream para indicar erros.

*   Conversão explícita de (possivelmente const) `fpos` para [std::streamoff](<#/doc/io/streamoff>). O resultado é o offset armazenado.

*   operator== e operator!= que comparam dois objetos do tipo (possivelmente const) `std::fpos` e retornam um prvalue booleano. p != q é equivalente a !(p == q).

*   operator+ e operator- tais que, para um objeto p do tipo (possivelmente const) `fpos<State>` e um objeto o do tipo (possivelmente const) [std::streamoff](<#/doc/io/streamoff>)

    *   p + o tem o tipo `fpos<State>` e armazena um offset que é o resultado da adição de o ao offset de p.
    *   o + p tem um tipo conversível para `fpos<State>` e o resultado da conversão é igual a p + o.
    *   p - o tem o tipo `fpos<State>` e armazena um offset que é o resultado da subtração de o do offset de p.

*   operator+= e operator-= que podem aceitar um (possivelmente const) [std::streamoff](<#/doc/io/streamoff>) e o adicionam/subtraem do offset armazenado, respectivamente.

*   operator- que pode subtrair dois objetos do tipo (possivelmente const) `std::fpos` produzindo um [std::streamoff](<#/doc/io/streamoff>), de modo que para dois objetos p e q, p == q + (p - q).

### Notas

Algumas das [funções membro de streams de E/S](<#/doc/io>) retornam e manipulam objetos do typedef membro `pos_type`. Para streams, esses typedefs membro são fornecidos pelo parâmetro de template `Traits`, que por padrão é [std::char_traits](<#/doc/string/char_traits>), que definem seus `pos_type`s como especializações de `std::fpos`. O comportamento da biblioteca de streams de E/S é definido pela implementação quando `Traits::pos_type` não é std::fpos<[std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> (também conhecido como `std::streampos`, `std::wstreampos`, etc.).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 57](<https://cplusplus.github.io/LWG/issue57>) | C++98 | `streampos` e `wstreampos` eram contraditoriamente permitidos serem diferentes enquanto exigido que fossem os mesmos | esclarecido para serem os mesmos
[P0759R1](<https://wg21.link/P0759R1>) | C++98 | especificação estava pouco clara e incompleta | limpa
[P1148R0](<https://wg21.link/P1148R0>) | C++11 | pouco claro o que e em qual header as definições `u16streampos` e `u32streampos` estão | esclarecido
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>) ([P2167R3](<https://wg21.link/P2167R3>)) | C++98 | tipos de retorno não-bool de comparações de igualdade eram permitidos | não permitidos

### Ver também

[ streamoff](<#/doc/io/streamoff>) | representa a posição relativa de arquivo/stream (offset de fpos), suficiente para representar qualquer tamanho de arquivo
---|---
(typedef) |
[ tellp](<#/doc/io/basic_ostream/tellp>) | retorna o indicador de posição de saída
(função membro pública de `std::basic_ostream<CharT,Traits>`) |
[ seekp](<#/doc/io/basic_ostream/seekp>) | define o indicador de posição de saída
(função membro pública de `std::basic_ostream<CharT,Traits>`) |
[ fgetpos](<#/doc/io/c/fgetpos>) | obtém o indicador de posição do arquivo
(função) |