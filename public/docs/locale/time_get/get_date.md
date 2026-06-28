# std::time_get&lt;CharT,InputIt&gt;::get_date, std::time_get&lt;CharT,InputIt&gt;::do_get_date

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
iter_type get_date( iter_type beg, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, std::tm* t ) const;
protected:
virtual iter_type do_get_date( iter_type beg, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, std::tm* t ) const;
```

1) Função membro pública, chama a função membro virtual protegida `do_get_date` da classe mais derivada.

2) Lê caracteres sucessivos da sequência `[`beg`, `end`)` e analisa o valor da data do calendário usando o formato padrão esperado por esta locale, que é determinado por [date_order()](<#/doc/locale/time_get/date_order>) | Formato
---|---
`no_order` | "%m/%d/%y"
`dmy` | "%d/%m/%y"
`mdy` | "%m/%d/%y"
`ymd` | "%y/%m/%d"
`ydm` | "%y/%d/%m"

conforme usado pelas funções [std::get_time()](<#/doc/io/manip/get_time>), [get()](<#/doc/locale/time_get/get>), e a função POSIX `strptime()`.

A data analisada é armazenada nos campos correspondentes da estrutura [std::tm](<#/doc/chrono/c/tm>) apontada pelo argumento t.

Se o iterador final for alcançado antes que uma data válida seja lida, a função define [std::ios_base::eofbit](<#/doc/io/ios_base/iostate>) em `err`. Se um erro de análise for encontrado, a função define [std::ios_base::failbit](<#/doc/io/ios_base/iostate>) em `err`.

### Parâmetros

- **beg** — iterador que designa o início da sequência a ser analisada
- **end** — iterador um após o final da sequência a ser analisada
- **str** — um objeto de stream que esta função usa para obter facets de locale quando necessário, por exemplo, [std::ctype](<#/doc/locale/ctype>) para pular espaços em branco ou [std::collate](<#/doc/locale/collate>) para comparar strings
- **err** — objeto de flags de erro de stream que é modificado por esta função para indicar erros
- **t** — ponteiro para o objeto [std::tm](<#/doc/chrono/c/tm>) que conterá o resultado desta chamada de função

### Valor de retorno

Iterador apontando para um caractere após o último caractere em `[`beg`, `end`)` que foi reconhecido como parte de uma data válida.

### Observações

Para os componentes alfabéticos do formato de data padrão (se houver), esta função geralmente não diferencia maiúsculas de minúsculas.

Se um erro de análise for encontrado, a maioria das implementações desta função deixa `*t` inalterado.

A implementação pode suportar outros formatos de data além dos exigidos pelo padrão.

### Exemplo

Execute este código
```cpp
    #include <ctime>
    #include <iostream>
    #include <iterator>
    #include <locale>
    #include <sstream>
    
    void try_get_date(const std::string& s)
    {
        std::cout << "Parsing the date out of '" << s
                  << "' in the locale " << std::locale().name() << '\n';
        std::istringstream str(s);
        std::ios_base::iostate err = std::ios_base::goodbit;
    
        std::tm t;
        const std::time_get<char>& facet = std::use_facet<std::time_get<char>>(str.getloc());
        std::istreambuf_iterator<char> ret = facet.get_date({str}, {}, str, err, &t);
        str.setstate(err);
    
        if (str)
        {
            std::cout << "Day: " << t.tm_mday << ' '
                      << "Month: " << t.tm_mon + 1 << ' '
                      << "Year: " << t.tm_year + 1900 << '\n';
        }
        else
        {
            std::cout << "Parse failed. Unparsed string: ";
            std::copy(ret, {}, std::ostreambuf_iterator<char>(std::cout));
            std::cout << '\n';
        }
    }
    int main()
    {
        std::locale::global(std::locale("en_US.utf8"));
        try_get_date("02/01/2013");
        try_get_date("02-01-2013");
    
        std::locale::global(std::locale("ja_JP.utf8"));
        try_get_date("2013年02月01日");
    }
```

Saída:
```
    Parsing the date out of '02/01/2013' in the locale en_US.utf8
    Day: 1 Month: 2 Year: 2013
    Parsing the date out of '02-01-2013' in the locale en_US.utf8
    Parse failed. Unparsed string: -01-2013
    Parsing the date out of '2013年02月01日' in the locale ja_JP.utf8
    Day: 1 Month: 2 Year: 2013
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 248](<https://cplusplus.github.io/LWG/issue248>) | C++98 | `eofbit` não era definido ao atingir o iterador final | define `eofbit` se uma data válida não foi lida
[LWG 461](<https://cplusplus.github.io/LWG/issue461>) | C++98 | `do_get_date` precisava analisar a representação de data localizada | analisa com o formato determinado por [date_order()](<#/doc/locale/time_get/date_order>)

### Veja também

[ get_time](<#/doc/io/manip/get_time>)(desde C++11) | analisa um valor de data/hora de formato especificado
(modelo de função)