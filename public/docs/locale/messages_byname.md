# std::messages_byname

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
class messages_byname : public std::messages<CharT>;
```

`std::messages_byname` é uma facet `[std::messages](<#/doc/locale/messages>)` que encapsula a recuperação de strings de catálogos de mensagens da locale especificada em sua construção.

### Especializações

A standard library tem garantia de fornecer as seguintes especializações:

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
std::messages_byname&lt;char&gt; | acesso a catálogo de mensagens narrow/multibyte
---|---
std::messages_byname<wchar_t> | acesso a catálogo de mensagens wide string

### Tipos aninhados

Tipo | Definição
---|---
`catalog` | [std::messages_base](<#/doc/locale/messages_base>)&lt;CharT&gt;::catalog
`string_type` | [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;

### Funções membro

(construtor) | constrói uma nova facet `messages_byname`
(função membro pública)
(destrutor) | destrói uma facet `messages_byname`
(função membro protegida)

## std::messages_byname::messages_byname

```cpp
explicit messages_byname( const char* name, std::size_t refs = 0 );
explicit messages_byname( const std::string& name, std::size_t refs = 0 );  // (desde C++11)
```

Constrói uma nova facet `std::messages_byname` para uma locale com nome.

`refs` é usado para gerenciamento de recursos: se `refs == 0`, a implementação destrói a facet, quando o último objeto [std::locale](<#/doc/locale/locale>) que a mantém é destruído. Caso contrário, o objeto não é destruído.

### Parâmetros

- **name** — o nome da locale
- **refs** — o número de referências que se ligam à facet

## std::messages_byname::~messages_byname

protected:
~messages_byname();

Destrói a facet.

## Herdado de [std::messages](<#/doc/locale/messages>)

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

[ open](<#/doc/locale/messages/open>) | invoca `do_open`
(função membro pública de `std::messages<CharT>`)
[ get](<#/doc/locale/messages/get>) | invoca `do_get`
(função membro pública de `std::messages<CharT>`)
[ close](<#/doc/locale/messages/close>) | invoca `do_close`
(função membro pública de `std::messages<CharT>`)

### Funções membro protegidas

[ do_open](<#/doc/locale/messages/open>)[virtual] | abre um catálogo de mensagens nomeado
(função membro virtual protegida de `std::messages<CharT>`)
[ do_get](<#/doc/locale/messages/get>)[virtual] | recupera uma mensagem de um catálogo de mensagens aberto
(função membro virtual protegida de `std::messages<CharT>`)
[ do_close](<#/doc/locale/messages/close>)[virtual] | fecha um catálogo de mensagens
(função membro virtual protegida de `std::messages<CharT>`)

## Herdado de [std::messages_base](<#/doc/locale/messages_base>)

### Tipos aninhados

Tipo | Definição
---|---
`catalog` | um tipo inteiro assinado não especificado

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    void try_with(const std::locale& loc)
    {
        const std::messages<char>& facet = std::use_facet<std::messages<char>>(loc);
    
        std::messages<char>::catalog cat = facet.open("sed", std::cout.getloc());
        if (cat < 0)
            std::cout << "Could not open \"sed\" message catalog\n";
        else
            std::cout << "\"No match\" "
                      << facet.get(cat, 0, 0, "No match") << '\n'
                      << "\"Memory exhausted\" " 
                      << facet.get(cat, 0, 0, "Memory exhausted") << '\n';
    
        facet.close(cat);
    }
    
    int main()
    {
        std::locale loc("en_US.utf8");
        std::cout.imbue(loc);
    
        try_with(std::locale(loc, new std::messages_byname<char>("de_DE.utf8")));
        try_with(std::locale(loc, new std::messages_byname<char>("fr_FR.utf8")));
        try_with(std::locale(loc, new std::messages_byname<char>("ja_JP.utf8")));
    }
```

Saída possível:
```
    "No match" Keine Übereinstimmung
    "Memory exhausted" Speicher erschöpft
    "No match" Pas de concordance
    "Memory exhausted" Mémoire épuisée
    "No match" 照合しません
    "Memory exhausted" メモリーが足りません
```

### Veja também

[ messages](<#/doc/locale/messages>) | implementa a recuperação de strings de catálogos de mensagens
(class template)