# std::time_get_byname

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template<
class CharT,
class InputIt = std::istreambuf_iterator<CharT>
> class time_get_byname : public std::time_get<CharT, InputIt>
```

`std::time_get_byname` é uma facet `std::time_get` que encapsula as regras de análise de tempo e data da locale especificada em sua construção.

### Especializações

A biblioteca padrão garante fornecer todas as especializações que satisfazem os seguintes requisitos de tipo:

*   `CharT` é um de char e wchar_t, e
*   `InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`
`iter_type` | `InputIt`

### Funções membro

**(construtor)** | constrói uma nova facet `time_get_byname`
(função membro pública)
**(destrutor)** | destrói uma facet `time_get_byname`
(função membro protegida)

## std::time_get_byname::time_get_byname

```cpp
explicit time_get_byname( const char* name, std::size_t refs = 0 );
explicit time_get_byname( const std::string& name, std::size_t refs = 0 );  // (desde C++11)
```

Constrói uma nova facet `std::time_get_byname` para uma locale com nome.

`refs` é usado para gerenciamento de recursos: se `refs == 0`, a implementação destrói a facet, quando o último objeto `std::locale` que a contém é destruído. Caso contrário, o objeto não é destruído.

### Parâmetros

- **name** — o nome da locale
- **refs** — o número de referências que se ligam à facet

## std::time_get_byname::~time_get_byname

protected:
~time_get_byname();

Destrói a facet.

## Herdado de [std::time_get](<#/doc/locale/time_get>)

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`
`iter_type` | `InputIt`

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador da [facet](<#/doc/locale/locale/facet>)

### Funções membro

[ date_order](<#/doc/locale/time_get/date_order>) | invoca `do_date_order`
(função membro pública de `std::time_get<CharT,InputIt>`)
[ get_time](<#/doc/locale/time_get/get_time>) | invoca `do_get_time`
(função membro pública de `std::time_get<CharT,InputIt>`)
[ get_date](<#/doc/locale/time_get/get_date>) | invoca `do_get_date`
(função membro pública de `std::time_get<CharT,InputIt>`)
[ get_weekday](<#/doc/locale/time_get/get_weekday>) | invoca `do_get_weekday`
(função membro pública de `std::time_get<CharT,InputIt>`)
[ get_monthname](<#/doc/locale/time_get/get_monthname>) | invoca `do_get_monthname`
(função membro pública de `std::time_get<CharT,InputIt>`)
[ get_year](<#/doc/locale/time_get/get_year>) | invoca `do_get_year`
(função membro pública de `std::time_get<CharT,InputIt>`)
[ get](<#/doc/locale/time_get/get>)(C++11) | invoca `do_get`
(função membro pública de `std::time_get<CharT,InputIt>`)

### Funções membro protegidas

[ do_date_order](<#/doc/locale/time_get/date_order>)[virtual] | obtém a ordem preferencial de dia, mês e ano
(função membro virtual protegida de `std::time_get<CharT,InputIt>`)
[ do_get_time](<#/doc/locale/time_get/get_time>)[virtual] | extrai horas, minutos e segundos do fluxo de entrada
(função membro virtual protegida de `std::time_get<CharT,InputIt>`)
[ do_get_date](<#/doc/locale/time_get/get_date>)[virtual] | extrai mês, dia e ano do fluxo de entrada
(função membro virtual protegida de `std::time_get<CharT,InputIt>`)
[ do_get_weekday](<#/doc/locale/time_get/get_weekday>)[virtual] | extrai o nome de um dia da semana do fluxo de entrada
(função membro virtual protegida de `std::time_get<CharT,InputIt>`)
[ do_get_monthname](<#/doc/locale/time_get/get_monthname>)[virtual] | extrai um nome de mês do fluxo de entrada
(função membro virtual protegida de `std::time_get<CharT,InputIt>`)
[ do_get_year](<#/doc/locale/time_get/get_year>)[virtual] | extrai um ano do fluxo de entrada
(função membro virtual protegida de `std::time_get<CharT,InputIt>`)
[ do_get](<#/doc/locale/time_get/get>)[virtual] (C++11) | extrai componentes de data/hora do fluxo de entrada, de acordo com o formato especificado
(função membro virtual protegida de `std::time_get<CharT,InputIt>`)

## Herdado de [std::time_base](<#/doc/locale/time_base>)

### Tipos aninhados

Tipo | Definição
---|---
`dateorder` | tipo de enumeração de ordem de data, definindo os valores `no_order`, `dmy`, `mdy`, `ymd`, e `ydm`

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ time_get](<#/doc/locale/time_get>) | analisa valores de tempo/data de uma sequência de caracteres de entrada em [std::tm](<#/doc/chrono/c/tm>)
(modelo de classe)
[ get_time](<#/doc/io/manip/get_time>)(C++11) | analisa um valor de data/hora de formato especificado
(modelo de função)