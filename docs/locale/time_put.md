# std::time_put

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template<
class CharT,
class OutputIt = std::ostreambuf_iterator<CharT>
> class time_put;
```

O template de classe `std::time_put` encapsula regras de formatação de data e hora. O manipulador de E/S [std::put_time](<#/doc/io/manip/put_time>) usa a facet `std::time_put` da locale do stream de E/S para gerar a representação textual de um objeto [std::tm](<#/doc/chrono/c/tm>).

Diagrama de herança

Se uma especialização de `std::time_put` não for garantida de ser fornecida pela standard library (veja abaixo), os comportamentos de seus [put()](<#/doc/locale/time_put/put>) e [do_put()](<#/doc/locale/time_put/put>) não são garantidos conforme especificado.

### Especializações

A standard library é garantida de fornecer as seguintes especializações (elas são [requeridas para serem implementadas por qualquer objeto locale](<#/doc/locale/locale>)):

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
std::time_put&lt;char&gt; | cria representações de string narrow de data e hora
---|---
std::time_put<wchar_t> | cria representações de string wide de data e hora

Além disso, a standard library também é garantida de fornecer toda especialização que satisfaça os seguintes requisitos de tipo:

  * `CharT` é um de char e wchar_t, e
  * `OutputIt` deve atender aos requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`
`iter_type` | `OutputIt`

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador da [facet](<#/doc/locale/locale/facet>)

### Funções membro

[ (construtor)](<#/doc/locale/time_put/time_put>) | constrói uma nova facet `time_put`
(função membro pública)
[ (destrutor)](<#/doc/locale/time_put/~time_put>) | destrói uma facet `time_put`
(função membro protegida)
[ put](<#/doc/locale/time_put/put>) | invoca `do_put`
(função membro pública)

### Funções membro protegidas

[ do_put](<#/doc/locale/time_put/put>)[virtual] | formata data/hora e escreve para o stream de saída
(função membro protegida virtual)

### Exemplo

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
        out.imbue(std::locale("ja_JP.utf8"));
    
        // this I/O manipulator std::put_time uses std::time_put<wchar_t>
        out << std::put_time(std::localtime(&t), L"%A %c") << '\n';
    }
```

Saída:
```
    水曜日 2011年11月09日 12時32分05秒
```

### Veja também

[ time_put_byname](<#/doc/locale/time_put_byname>) | representa o **std::time_put** fornecido pelo sistema para a locale nomeada
(template de classe)
[ time_get](<#/doc/locale/time_get>) | analisa valores de tempo/data de uma sequência de caracteres de entrada em [std::tm](<#/doc/chrono/c/tm>)
(template de classe)
[ put_time](<#/doc/io/manip/put_time>)(C++11) | formata e exibe um valor de data/hora de acordo com o formato especificado
(template de função)