# std::time_get&lt;CharT,InputIt&gt;::get_monthname, std::time_get&lt;CharT,InputIt&gt;::do_get_monthname

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
iter_type get_monthname( iter_type beg, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, std::tm* t ) const;
protected:
virtual iter_type do_get_monthname( iter_type beg, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, std::tm* t ) const;
```

1) Função membro pública, chama a função membro virtual protegida `do_get_monthname` da classe mais derivada.

2) Lê caracteres sucessivos da sequência `[`beg`, `end`)` e analisa o nome do mês (possivelmente abreviado), usando o formato padrão para nomes de meses esperado por esta locale, que é o mesmo formato de "%b" usado pelas funções [std::get_time](<#/doc/io/manip/get_time>), [`time_get::get`](<#/doc/locale/time_get/get>), e a função POSIX `strptime()`.

Se encontrar um nome abreviado, seguido pelos caracteres que são válidos para o nome completo, ele continua lendo até consumir todos os caracteres para o nome completo ou encontrar um caractere que não é esperado, caso em que a análise falha mesmo que os primeiros caracteres fossem uma abreviação válida.

O mês analisado é armazenado no campo t->tm_mon de [std::tm](<#/doc/chrono/c/tm>).

Se o iterator final for alcançado antes que um nome de mês válido seja lido, a função define [std::ios_base::eofbit](<#/doc/io/ios_base/iostate>) em err. Se um erro de análise for encontrado, a função define [std::ios_base::failbit](<#/doc/io/ios_base/iostate>) em err.

### Parâmetros

- **beg** — iterator que designa o início da sequência a ser analisada
- **end** — iterator um após o final da sequência a ser analisada
- **str** — um objeto stream que esta função usa para obter facets de locale quando necessário, por exemplo, [std::ctype](<#/doc/locale/ctype>) para pular espaços em branco ou [std::collate](<#/doc/locale/collate>) para comparar strings
- **err** — objeto de flags de erro de stream que é modificado por esta função para indicar erros
- **t** — ponteiro para o objeto [std::tm](<#/doc/chrono/c/tm>) que conterá o resultado desta chamada de função

### Valor de retorno

Iterator apontando um após o último caractere em `[`beg`, `end`)` que foi reconhecido como parte de um nome de mês válido.

### Observações

Esta função geralmente não diferencia maiúsculas de minúsculas.

Se um erro de análise for encontrado, a maioria das implementações desta função deixa *t inalterado.

### Exemplo

Execute este código
```cpp
    #include <ctime>
    #include <iostream>
    #include <iterator>
    #include <locale>
    #include <sstream>
    #include <string_view>
    
    void try_get_mon(std::string_view locale_name, std::string_view source)
    {
        try
        {
            std::locale::global(std::locale(locale_name.data()));
        }
        catch (std::runtime_error const& ex)
        {
            std::cout << "Cannot setup locale: " << locale_name << "\n"
                         "Exception: " << ex.what() << '\n';
            return;
        }
    
        std::cout << "Parsing the month out of '" << source
                  << "' in the locale " << std::locale().name() << '\n';
        std::istringstream str{source.data()};
        std::ios_base::iostate err = std::ios_base::goodbit;
    
        std::tm t;
        std::time_get<char> const& facet = std::use_facet<std::time_get<char>>(str.getloc());
        std::istreambuf_iterator<char> ret = facet.get_monthname({str}, {}, str, err, &t);
        str.setstate(err);
        std::istreambuf_iterator<char> last{};
    
        if (str)
        {
            std::cout << "Successfully parsed, month number is " << t.tm_mon;
    
            if (ret != last)
            {
                std::cout << ". Remaining content: ";
                std::copy(ret, last, std::ostreambuf_iterator<char>(std::cout));
            }
            else
                std::cout << ". The input was fully consumed";
        }
        else
        {
            std::cout << "Parse failed. Unparsed string: ";
            std::copy(ret, last, std::ostreambuf_iterator<char>(std::cout));
        }
    
        std::cout << '\n';
    }
    
    int main()
    {
        try_get_mon("ja_JP.utf8", "2月");
        try_get_mon("th_TH.utf8", "กุมภาพันธ์");
        try_get_mon("el_GR.utf8", "Φεβ");
        try_get_mon("el_GR.utf8", "Φεβρουάριος");
        try_get_mon("en_US.utf8", "Febrile");
    }
```

Saída possível:
```
    Parsing the month out of '2月' in the locale ja_JP.utf8
    Successfully parsed, month number is 1. The input was fully consumed
    Parsing the month out of 'กุมภาพันธ์' in the locale th_TH.utf8
    Successfully parsed, month number is 1. The input was fully consumed
    Parsing the month out of 'Φεβ' in the locale el_GR.utf8
    Successfully parsed, month number is 1. The input was fully consumed
    Parsing the month out of 'Φεβρουάριος' in the locale el_GR.utf8
    Successfully parsed, month number is 1. The input was fully consumed
    Parsing the month out of 'Febrile' in the locale en_US.utf8
    Parse failed. Unparsed string: ile
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 248](<https://cplusplus.github.io/LWG/issue248>) | C++98 | `eofbit` não era definido ao atingir o iterator final | define `eofbit` se um nome de mês válido não foi lido

### Veja também

[ get_time](<#/doc/io/manip/get_time>)(desde C++11) | analisa um valor de data/hora de formato especificado
(modelo de função)