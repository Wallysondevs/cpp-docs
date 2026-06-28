# std::collate_byname

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
class collate_byname : public std::collate<CharT>;
```

`std::collate_byname` é um [std::collate](<#/doc/locale/collate>) facet que encapsula a ordenação (comparação) e o hashing de strings específicos da locale. Assim como [std::collate](<#/doc/locale/collate>), ele pode ser imbuído em [std::regex](<#/doc/regex/basic_regex>) e aplicado, por meio de [`std::locale::operator()`](<#/>), diretamente a todos os algoritmos padrão que esperam um predicado de comparação de strings.

### Especializações

A standard library garante fornecer as seguintes especializações:

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
std::collate_byname&lt;char&gt; | ordenação específica da locale de strings multibyte
---|---
std::collate_byname<wchar_t> | ordenação específica da locale de wide strings

### Funções membro

**(construtor)** | constrói um novo facet `collate_byname`
(função membro pública)
**(destrutor)** | destrói um facet `collate_byname`
(função membro protegida)

## std::collate_byname::collate_byname

```cpp
explicit collate_byname( const char* name, std::size_t refs = 0 );
explicit collate_byname( const std::string& name, std::size_t refs = 0 );  // (desde C++11)
```

Constrói um novo facet `std::collate_byname` para uma locale com nome.

`refs` é usado para gerenciamento de recursos: se `refs == 0`, a implementação destrói o facet quando o último objeto [std::locale](<#/doc/locale/locale>) que o contém é destruído. Caso contrário, o objeto não é destruído.

### Parâmetros

- **name** — o nome da locale
- **refs** — o número de referências que apontam para o facet

## std::collate_byname::~collate_byname

protected:
~collate_byname();

Destrói o facet.

## Herdado de [std::collate](<#/doc/locale/collate>)

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`
`string_type` | [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador do [facet](<#/doc/locale/locale/facet>)

### Funções membro

[ compare](<#/doc/locale/collate/compare>) | invoca `do_compare`
(função membro pública de `std::collate<CharT>`)
[ transform](<#/doc/locale/collate/transform>) | invoca `do_transform`
(função membro pública de `std::collate<CharT>`)
[ hash](<#/doc/locale/collate/hash>) | invoca `do_hash`
(função membro pública de `std::collate<CharT>`)

### Funções membro protegidas

[ do_compare](<#/doc/locale/collate/compare>)[virtual] | compara duas strings usando as regras de ordenação deste facet
(função membro protegida virtual de `std::collate<CharT>`)
[ do_transform](<#/doc/locale/collate/transform>)[virtual] | transforma uma string para que a ordenação possa ser substituída por comparação
(função membro protegida virtual de `std::collate<CharT>`)
[ do_hash](<#/doc/locale/collate/hash>)[virtual] | gera um valor hash inteiro usando as regras de ordenação deste facet
(função membro protegida virtual de `std::collate<CharT>`)

### Notas

A ordem de ordenação é a ordem do dicionário: a posição da letra no alfabeto nacional (sua classe de equivalência) tem prioridade maior do que seu caso ou variante. Dentro de uma classe de equivalência, caracteres minúsculos são ordenados antes de seus equivalentes maiúsculos e a ordem específica da locale pode ser aplicada aos caracteres com diacríticos. Em algumas locales, grupos de caracteres são comparados como unidades de ordenação únicas. Por exemplo, "ch" em tcheco segue "h" e precede "i", e "dzs" em húngaro segue "dz" e precede "g".

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ collate](<#/doc/locale/collate>) | define comparação lexicográfica e hashing de strings
(modelo de classe)
[ strcoll](<#/doc/string/byte/strcoll>) | compara duas strings de acordo com a locale atual
(função)
[ wcscoll](<#/doc/string/wide/wcscoll>) | compara duas wide strings de acordo com a locale atual
(função)
[ operator()](<#/>) | compara lexicograficamente duas strings usando o facet collate desta locale
(função membro pública de `std::locale`)