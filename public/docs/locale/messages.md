# std::messages

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
class messages;
```

O template de classe `std::messages` é uma facet de locale padrão que encapsula a recuperação de strings de catálogos de mensagens, como os fornecidos pelo GNU [gettext](<https://www.gnu.org/s/gettext/>) ou pelo POSIX [`catgets`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/catgets.html>).

A origem das mensagens é definida pela implementação.

Diagrama de herança

### Especializações

A standard library garante o fornecimento das seguintes especializações (elas são [obrigatórias para serem implementadas por qualquer objeto locale](<#/doc/locale/locale>)):

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
std::messages&lt;char&gt; | acessa o catálogo de mensagens de string estreita
---|---
std::messages<wchar_t> | acessa o catálogo de mensagens de string larga

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`
`string_type` | [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador da [facet](<#/doc/locale/locale/facet>)

### Funções membro

[ (construtor)](<#/doc/locale/messages/messages>) | constrói uma nova facet `messages`
(função membro pública)
[ (destrutor)](<#/doc/locale/messages/~messages>) | destrói uma facet `messages`
(função membro protegida)
[ open](<#/doc/locale/messages/open>) | invoca `do_open`
(função membro pública)
[ get](<#/doc/locale/messages/get>) | invoca `do_get`
(função membro pública)
[ close](<#/doc/locale/messages/close>) | invoca `do_close`
(função membro pública)

### Funções membro protegidas

[ do_open](<#/doc/locale/messages/open>)[virtual] | abre um catálogo de mensagens nomeado
(função membro virtual protegida)
[ do_get](<#/doc/locale/messages/get>)[virtual] | recupera uma mensagem de um catálogo de mensagens aberto
(função membro virtual protegida)
[ do_close](<#/doc/locale/messages/close>)[virtual] | fecha um catálogo de mensagens
(função membro virtual protegida)

## Herdado de [std::messages_base](<#/doc/locale/messages_base>)

### Tipos aninhados

Tipo | Definição
---|---
`catalog` | um tipo inteiro assinado não especificado

### Veja também

[ messages_base](<#/doc/locale/messages_base>) | define o tipo de catálogo de mensagens
(classe)
[ messages_byname](<#/doc/locale/messages_byname>) | representa o **std::messages** fornecido pelo sistema para o locale nomeado
(template de classe)