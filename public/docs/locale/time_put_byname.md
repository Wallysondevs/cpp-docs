# std::time_put_byname

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template<
class CharT,
class OutputIt = std::ostreambuf_iterator<CharT>
> class time_put_byname : public std::time_put<CharT, OutputIt>
```

`std::time_put_byname` é uma facet [std::time_put](<#/doc/locale/time_put>) que encapsula as regras de formatação de hora e data da locale especificada em sua construção.

### Especializações

A biblioteca padrão garante fornecer toda especialização que satisfaça os seguintes requisitos de tipo:

*   `CharT` é um de `char` e `wchar_t`, e
*   `OutputIt` deve atender aos requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`
`iter_type` | `OutputIt`

### Funções membro

**(construtor)** | constrói uma nova facet `time_put_byname`
(função membro pública)
**(destrutor)** | destrói uma facet `time_put_byname`
(função membro protegida)

## std::time_put_byname::time_put_byname

```cpp
explicit time_put_byname( const char* name, std::size_t refs = 0 );
explicit time_put_byname( const std::string& name, std::size_t refs = 0 );  // (desde C++11)
```

Constrói uma nova facet `std::time_put_byname` para uma locale com nome.

`refs` é usado para gerenciamento de recursos: se `refs == 0`, a implementação destrói a facet quando o último objeto [std::locale](<#/doc/locale/locale>) que a contém é destruído. Caso contrário, o objeto não é destruído.

### Parâmetros

- **name** — o nome da locale
- **refs** — o número de referências que apontam para a facet

## std::time_put_byname::~time_put_byname

protected:
~time_put_byname();

Destrói a facet.

## Herdado de [std::time_put](<#/doc/locale/time_put>)

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador da [facet](<#/doc/locale/locale/facet>)

### Funções membro

[ put](<#/doc/locale/time_put/put>) | invoca `do_put`
(função membro pública de `std::time_put<CharT,OutputIt>`)

### Funções membro protegidas

[ do_put](<#/doc/locale/time_put/put>)[virtual] | formata data/hora e escreve para o stream de saída
(função membro protegida virtual de `std::time_put<CharT,OutputIt>`)

### Exemplo

Imprime a hora atual usando a locale "C" com a facet `time_put` substituída por várias facets `std::time_put_byname`. O resultado mostrado foi obtido usando o compilador clang.

Execute este código
```cpp
    #include <codecvt>
    #include <ctime>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        std::time_t t = std::time(nullptr);
        std::wbuffer_convert<std::codecvt_utf8<wchar_t>> conv(std::cout.rdbuf());
        std::wostream out(&conv);
    
        out.imbue(std::locale(out.getloc(),
                              new std::time_put_byname<wchar_t>("ja_JP.utf8")));
        out << std::put_time(std::localtime(&t), L"%A %c") << '\n';
    
        out.imbue(std::locale(out.getloc(),
                              new std::time_put_byname<wchar_t>("ru_RU.utf8")));
        out << std::put_time(std::localtime(&t), L"%A %c") << '\n';
    
        out.imbue(std::locale(out.getloc(),
                              new std::time_put_byname<wchar_t>("sv_SE.utf8")));
        out << std::put_time(std::localtime(&t), L"%A %c") << '\n';
    }
```

Saída possível:
```
    木曜日 2023年10月05日 19時44分51秒
    Четверг Чт 05 окт 2023 19:44:51
    torsdag tor  5 okt 2023 19:44:51
```

### Veja também

[ time_put](<#/doc/locale/time_put>) | formata o conteúdo de [std::tm](<#/doc/chrono/c/tm>) para saída como sequência de caracteres
(modelo de classe)