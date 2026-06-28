# std::time_get&lt;CharT,InputIt&gt;::get_time, std::time_get&lt;CharT,InputIt&gt;::do_get_time

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
iter_type get_time( iter_type beg, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, std::tm* t ) const;
protected:
virtual iter_type do_get_time( iter_type beg, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, std::tm* t ) const;
```

  
1) Função membro pública, chama a função membro virtual protegida `do_get_time` da classe mais derivada.

2) Lê caracteres sucessivos da sequência `[`beg`, `end`)` e analisa o valor de tempo seguindo as mesmas regras do especificador de formato "%H:%M:%S" conforme usado pelas funções [std::get_time](<#/doc/io/manip/get_time>), [`time_get::get`](<#/doc/locale/time_get/get>), e a função POSIX `strptime()`.

    

     O tempo analisado é armazenado nos campos correspondentes da estrutura [std::tm](<#/doc/chrono/c/tm>) apontada pelo argumento t. 

    

     Se o iterator final for alcançado antes que um tempo válido seja lido, a função define [std::ios_base::eofbit](<#/doc/io/ios_base/iostate>) em err. Se um erro de análise for encontrado, a função define [std::ios_base::failbit](<#/doc/io/ios_base/iostate>) em err. 

### Parâmetros

beg  |  \-  |  iterator que designa o início da sequência a ser analisada   
---|---|---
end  |  \-  |  iterator um após o final para a sequência a ser analisada   
str  |  \-  |  um objeto de stream que esta função usa para obter facets de locale quando necessário, por exemplo, [std::ctype](<#/doc/locale/ctype>) para pular espaços em branco   
err  |  \-  |  objeto de flags de erro de stream que é modificado por esta função para indicar erros   
t  |  \-  |  ponteiro para o objeto [std::tm](<#/doc/chrono/c/tm>) que conterá o resultado desta chamada de função   
  
### Valor de retorno

Iterator apontando para um caractere após o último em `[`beg`, `end`)` que foi reconhecido como parte de uma data válida. 

### Notas

Para os componentes alfabéticos do formato de tempo padrão (se houver), esta função geralmente não diferencia maiúsculas de minúsculas. 

Se um erro de análise for encontrado, a maioria das implementações desta função deixa *t inalterado. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <locale>
    #include <sstream>
    
    void try_get_time(const std::string& s)
    {
        std::cout << "Parsing the time out of '" << s
                  << "' in the locale " << std::locale().name() << '\n';
        std::istringstream str(s);
        std::ios_base::iostate err = std::ios_base::goodbit;
    
        std::tm t;
        std::time_get<char> const& facet =
            std::use_facet<std::time_get<char>>(str.getloc());
        std::istreambuf_iterator<char> ret =
            facet.get_time({str}, {}, str, err, &t);
        str.setstate(err);
    
        if (str)
        {
            std::cout << "Hours: " << t.tm_hour << ", "
                         "Minutes: " << t.tm_min  << ", "
                         "Seconds: " << t.tm_sec  << '\n';
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
        std::locale::global(std::locale("ru_RU.utf8"));
        try_get_time("21:40:11");
        try_get_time("21-40-11");
    
        std::locale::global(std::locale("ja_JP.utf8"));
        try_get_time("21時37分58秒");
    }
```

Saída: 
```
    Parsing the time out of '21:40:11' in the locale ru_RU.utf8
    Hours: 21, Minutes: 40, Seconds: 11
    Parsing the time out of '21-40-11' in the locale ru_RU.utf8
    Parse failed. Unparsed string: -40-11
    Parsing the time out of '21時37分58秒' in the locale ja_JP.utf8
    Hours: 21, Minutes: 37, Seconds: 58
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 248](<https://cplusplus.github.io/LWG/issue248>) | C++98  | `eofbit` não era definido ao alcançar o iterator final  | define `eofbit` se um tempo válido não foi lido   
[LWG 461](<https://cplusplus.github.io/LWG/issue461>) | C++98  | `do_get_time` precisava analisar a representação de tempo localizada  | analisa com o formato "%H:%M:%S"   
  
### Veja também

[ get_time](<#/doc/io/manip/get_time>)(C++11) |  analisa um valor de data/hora de formato especificado   
(modelo de função)  