# std::time_get&lt;CharT,InputIt&gt;::get_year, std::time_get&lt;CharT,InputIt&gt;::do_get_year

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
iter_type get_year( iter_type s, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, std::tm* t ) const;
protected:
virtual iter_type do_get_year( iter_type s, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, std::tm* t ) const;
```

1) Função membro pública, chama a função membro virtual protegida `do_get_year` da classe mais derivada.

2) Lê caracteres sucessivos da sequência `[`beg`, `end`)` e analisa o ano usando algum formato definido pela implementação. Dependendo da locale, anos de dois dígitos podem ser aceitos, e é definido pela implementação a qual século eles pertencem.

O ano analisado é armazenado no campo `t->tm_year` da estrutura [std::tm](<#/doc/chrono/c/tm>).

Se o iterator final for alcançado antes que um ano válido seja lido, a função define [std::ios_base::eofbit](<#/doc/io/ios_base/iostate>) em `err`. Se um erro de análise for encontrado, a função define [std::ios_base::failbit](<#/doc/io/ios_base/iostate>) em `err`.

### Parâmetros

- **beg** — iterator que designa o início da sequência a ser analisada
- **end** — iterator um após o final para a sequência a ser analisada
- **str** — um objeto stream que esta função usa para obter facets de locale quando necessário, por exemplo, [std::ctype](<#/doc/locale/ctype>) para pular espaços em branco ou [std::collate](<#/doc/locale/collate>) para comparar strings
- **err** — objeto de flags de erro de stream que é modificado por esta função para indicar erros
- **t** — ponteiro para o objeto [std::tm](<#/doc/chrono/c/tm>) que conterá o resultado desta chamada de função

### Valor de retorno

Iterator apontando um após o último caractere em `[`beg`, `end`)` que foi reconhecido como parte de um ano válido.

### Observações

Para valores de entrada de dois dígitos, muitas implementações usam as mesmas regras de análise que o especificador de conversão '%y' usado por [std::get_time](<#/doc/io/manip/get_time>), [std::time_get::get()](<#/doc/locale/time_get/get>), e a função POSIX `strptime()`: um inteiro de dois dígitos é esperado, os valores no range `[`69`, `99`]` resultam em valores de 1969 a 1999, o range `[`00`, `68`]` resulta em 2000 a 2068. Entradas de quatro dígitos são tipicamente aceitas como estão.

Se um erro de análise for encontrado, a maioria das implementações desta função deixa *t inalterado.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <locale>
    #include <sstream>
    
    void try_get_year(const std::string& s)
    {
        std::cout << "Parsing the year out of '" << s
                  << "' in the locale " << std::locale().name() << '\n';
        std::istringstream str(s);
        std::ios_base::iostate err = std::ios_base::goodbit;
    
        std::tm t;
        std::time_get<char> const& facet = std::use_facet<std::time_get<char>>(str.getloc());
        std::istreambuf_iterator<char> ret = facet.get_year({str}, {}, str, err, &t);
        str.setstate(err);
        std::istreambuf_iterator<char> last{};
    
        if (str)
        {
            std::cout << "Successfully parsed, year is " << 1900 + t.tm_year;
    
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
    
    int main()
    {
        std::locale::global(std::locale("en_US.utf8"));
        try_get_year("13");
        try_get_year("2013");
    
        std::locale::global(std::locale("ja_JP.utf8"));
        try_get_year("2013年");
    }
```

Saída possível:
```
    Parsing the year out of '13' in the locale en_US.utf8
    Successfully parsed, year is 2013 the input was fully consumed
    Parsing the year out of '2013' in the locale en_US.utf8
    Successfully parsed, year is 2013 the input was fully consumed
    Parsing the year out of '2013年' in the locale ja_JP.utf8
    Successfully parsed, year is 2013 Remaining content: 年
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 248](<https://cplusplus.github.io/LWG/issue248>) | C++98 | `eofbit` não era definido ao atingir o iterator final | define `eofbit` se um ano válido não foi lido

### Veja também

[ get_time](<#/doc/io/manip/get_time>)(desde C++11) | analisa um valor de data/hora de formato especificado
(modelo de função)
* [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
* [Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão