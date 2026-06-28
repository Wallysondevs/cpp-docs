# std::num_get

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template<
class CharT,
class InputIt = std::istreambuf_iterator<CharT>
> class num_get;
```

A classe `std::num_get` encapsula as regras para analisar representações de string de valores numéricos. Especificamente, os tipos bool, unsigned short, unsigned int, long, unsigned long, long long, unsigned long long(desde C++11), float, double, long double e void* são suportados. Os operadores de entrada de formatação padrão (como cin >> n;) usam o facet `std::num_get` da locale do stream de E/S para analisar as representações textuais dos números.

Diagrama de herança

Se uma especialização de `std::num_get` não for garantida de ser fornecida pela standard library (veja abaixo), os comportamentos de seus [get()](<#/doc/locale/num_get/get>) e [do_get()](<#/doc/locale/num_get/get>) não são garantidos conforme especificado.

### Especializações

A standard library é garantida de fornecer as seguintes especializações (elas são [exigidas para serem implementadas por qualquer objeto locale](<#/doc/locale/locale>)):

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
std::num_get&lt;char&gt; | cria análise de string narrow de números
---|---
std::num_get<wchar_t> | cria análise de string wide de números

Além disso, a standard library também é garantida de fornecer toda especialização que satisfaça os seguintes requisitos de tipo:

  * `CharT` é um dos
    * char,
    * wchar_t, e
    * qualquer outro [tipo de container de caractere](<#/doc/string>) definido pela implementação que atenda aos requisitos para um caractere no qual qualquer um dos [componentes iostream](<#/doc/io>) possa ser instanciado; e
  * `InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`
`iter_type` | `InputIt`

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador do [facet](<#/doc/locale/locale/facet>)

### Funções membro

[ (construtor)](<#/doc/locale/num_get/num_get>) | constrói um novo facet `num_get`
(função membro pública)
[ get](<#/doc/locale/num_get/get>) | invoca `do_get`
(função membro pública)

### Funções membro protegidas

[ (destrutor)](<#/doc/locale/num_get/~num_get>) | destrói um facet `num_get`
(função membro protegida)
[ do_get](<#/doc/locale/num_get/get>)[virtual] | analisa um número de um input stream
(função membro protegida virtual)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <locale>
    #include <sstream>
    #include <string>
    
    int main()
    {
        std::string de_double = "1.234.567,89";
        std::string us_double = "1,234,567.89";
    
        // parse using streams
        std::istringstream de_in(de_double);
        de_in.imbue(std::locale("de_DE.UTF-8"));
        double f1;
        de_in >> f1;
    
        std::istringstream us_in(de_double);
        us_in.imbue(std::locale("en_US.UTF-8"));
        double f2;
        us_in >> f2;
    
        std::cout << "Parsing " << de_double << " as double gives " << std::fixed
                  << f1 << " in de_DE locale and " << f2 << " in en_US\n";
    
        // use the facet directly
        std::istringstream s3(us_double);
        s3.imbue(std::locale("en_US.UTF-8"));
    
        auto& f = std::use_facet<std::num_get<char>>(s3.getloc());
        std::istreambuf_iterator<char> beg(s3), end;
        double f3;
        std::ios::iostate err;
        f.get(beg, end, s3, err, f3);
    
        std::cout << "parsing " << us_double
                  << " as double using raw en_US facet gives " << f3 << '\n';
    }
```

Saída:
```
    Parsing 1.234.567,89 as double gives 1234567.890000 in de_DE locale and 1.234000 in en_US
    parsing 1,234,567.89 as double using raw en_US facet gives 1234567.890000
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 427](<https://cplusplus.github.io/LWG/issue427>) | C++98 | `num_get` era garantido de aceitar qualquer `CharT` que atendesse aos requisitos para um caractere no qual qualquer um dos componentes iostream pudesse ser instanciado | apenas garante aceitar char, wchar_t e outros tipos de caractere definidos pela implementação
[LWG 2392](<https://cplusplus.github.io/LWG/issue2392>) | C++98 | apenas o tipo de caractere `CharT` poderia ser garantido de ser aceito por `num_get` | pode garantir aceitar tipos de container de caractere definidos pela implementação

### Veja também

[ numpunct](<#/doc/locale/numpunct>) | define regras de pontuação numérica
(modelo de classe)
[ num_put](<#/doc/locale/num_put>) | formata valores numéricos para saída como sequência de caracteres
(modelo de classe)
[ operator>>](<#/doc/io/basic_istream/operator_gtgt>) | extrai dados formatados
(função membro pública de `std::basic_istream<CharT,Traits>`)