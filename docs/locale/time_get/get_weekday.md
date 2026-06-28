# std::time_get&lt;CharT,InputIt&gt;::get_weekday, std::time_get&lt;CharT,InputIt&gt;::do_get_weekday

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
iter_type get_weekday( iter_type beg, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, std::tm* t ) const;
protected:
virtual iter_type do_get_weekday( iter_type beg, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, std::tm* t ) const;
```

1) Função membro pública, chama a função membro virtual protegida `do_get_weekday` da classe mais derivada.

2) Lê caracteres sucessivos da sequência `[`beg`, `end`)` e analisa o nome do dia da semana (possivelmente abreviado), usando o formato padrão para dias da semana esperado por esta locale, que é o mesmo formato que "%a" usado pelas funções [std::get_time](<#/doc/io/manip/get_time>), [`time_get::get`](<#/doc/locale/time_get/get>), e a função POSIX `strptime()`.

Se encontrar um nome abreviado, seguido pelos caracteres válidos para o nome completo, ele continua lendo até consumir todos os caracteres para o nome completo ou encontrar um caractere que não é esperado, caso em que a análise falha mesmo que os primeiros caracteres fossem uma abreviação válida.

O dia da semana analisado é armazenado no campo t->tm_wday do [std::tm](<#/doc/chrono/c/tm>).

Se o iterator final for alcançado antes que um nome de dia da semana válido seja lido, a função define [std::ios_base::eofbit](<#/doc/io/ios_base/iostate>) em err. Se um erro de análise for encontrado, a função define [std::ios_base::failbit](<#/doc/io/ios_base/iostate>) em err.

### Parâmetros

- **beg** — iterator que designa o início da sequência a ser analisada
- **end** — iterator um após o final para a sequência a ser analisada
- **str** — um objeto stream que esta função usa para obter facets de locale quando necessário, por exemplo, [std::ctype](<#/doc/locale/ctype>) para pular espaços em branco ou [std::collate](<#/doc/locale/collate>) para comparar strings
- **err** — objeto de flags de erro de stream que é modificado por esta função para indicar erros
- **t** — ponteiro para o objeto [std::tm](<#/doc/chrono/c/tm>) que conterá o resultado desta chamada de função

### Valor de retorno

Iterator apontando um após o último caractere em `[`beg`, `end`)` que foi reconhecido como parte de um nome de dia da semana válido.

### Notas

Esta função geralmente não diferencia maiúsculas de minúsculas.

Se um erro de análise for encontrado, a maioria das implementações desta função deixa *t inalterado.

### Exemplo

Execute este código
```cpp
    #include <initializer_list>
    #include <iostream>
    #include <iterator>
    #include <locale>
    #include <sstream>
    #include <string_view>
    
    void try_get_wday(std::string_view s)
    {
        std::cout << "Parsing the weekday out of '" << s
                  << "' in the locale " << std::locale().name() << '\n';
        std::istringstream str{s.data()};
        std::ios_base::iostate err{std::ios_base::goodbit};
    
        std::tm t;
        std::time_get<char> const& facet = std::use_facet<std::time_get<char>>(str.getloc());
        std::istreambuf_iterator<char> ret = facet.get_weekday({str}, {}, str, err, &t);
        str.setstate(err);
        std::istreambuf_iterator<char> last{};
    
        if (str)
        {
            std::cout << "Successfully parsed, weekday number is " << t.tm_wday;
    
            if (ret != last)
            {
                std::cout << " Remaining content: ";
                std::copy(ret, last, std::ostreambuf_iterator<char>(std::cout));
            }
            else
                std::cout << " the input was fully consumed";
        }
        else
        {
            std::cout << "Parse failed. Unparsed string: ";
            std::copy(ret, last, std::ostreambuf_iterator<char>(std::cout));
        }
    
        std::cout << '\n';
    }
    
    void demo(std::string_view locale_name, std::initializer_list<std::string_view>&& data)
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
    
        for (std::string_view const weekday : data)
            try_get_wday(weekday);
    }
    
    int main()
    {
        demo("lt_LT.utf8", {"Št", "Šeštadienis"});
        demo("en_US.utf8", {"SATELLITE"});
        demo("ja_JP.utf8", {"土曜日"});
    }
```

Saída possível:
```
    Parsing the weekday out of 'Št' in the locale lt_LT.utf8
    Successfully parsed, weekday number is 6 the input was fully consumed
    Parsing the weekday out of 'Šeštadienis' in the locale lt_LT.utf8
    Successfully parsed, weekday number is 6 the input was fully consumed
    Parsing the weekday out of 'SATELLITE' in the locale en_US.utf8
    Successfully parsed, weekday number is 6 Remaining content: ELLITE
    Parsing the weekday out of '土曜日' in the locale ja_JP.utf8
    Successfully parsed, weekday number is 6 the input was fully consumed
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 248](<https://cplusplus.github.io/LWG/issue248>) | C++98 | `eofbit` não era definido ao atingir o iterator final | define `eofbit` se um nome de dia da semana válido não foi lido

### Veja também

[ get_time](<#/doc/io/manip/get_time>)(desde C++11) | analisa um valor de data/hora de formato especificado
(modelo de função)