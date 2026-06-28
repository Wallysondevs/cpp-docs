# std::num_get&lt;CharT,InputIt&gt;::get, std::num_get&lt;CharT,InputIt&gt;::do_get

```cpp
  // (1)
public:
iter_type get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, bool& v ) const;
iter_type get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, long& v ) const;
iter_type get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, long long& v ) const;  // (desde C++11)
iter_type get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, unsigned short& v ) const;
iter_type get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, unsigned int& v ) const;
iter_type get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, unsigned long& v ) const;
iter_type get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, unsigned long long& v ) const;  // (desde C++11)
iter_type get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, float& v ) const;
iter_type get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, double& v ) const;
iter_type get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, long double& v ) const;
iter_type get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, void*& v ) const;
  // (2)
protected:
virtual iter_type do_get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, bool& v ) const;
virtual iter_type do_get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, long& v ) const;
virtual iter_type do_get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, long long& v ) const;  // (desde C++11)
virtual iter_type do_get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, unsigned short& v ) const;
virtual iter_type do_get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, unsigned int& v ) const;
virtual iter_type do_get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, unsigned long& v ) const;
virtual iter_type do_get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err,
unsigned long long& v ) const;  // (desde C++11)
virtual iter_type do_get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, float& v ) const;
virtual iter_type do_get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, double& v ) const;
virtual iter_type do_get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, long double& v ) const;
virtual iter_type do_get( iter_type in, iter_type end, std::ios_base& str,
std::ios_base::iostate& err, void*& v ) const;
```

  
1) Função membro pública, chama a função membro `do_get` da classe mais derivada.

2) Lê caracteres do iterator de entrada `in` e gera o valor do tipo de `v`, levando em consideração os flags de formatação de stream de E/S de `str.flags()`, as regras de classificação de caracteres de [std::use_facet](<#/doc/locale/use_facet>)<[std::ctype](<#/doc/locale/ctype>)&lt;CharT&gt;>(str.getloc()), e os caracteres de pontuação numérica de [std::use_facet](<#/doc/locale/use_facet>)<[std::numpunct](<#/doc/locale/numpunct>)&lt;CharT&gt;>(str.getloc()). Esta função é chamada por todos os operadores de stream de entrada formatada, como [std::cin](<#/doc/io/cin>) >> n;.

A conversão ocorre em três estágios: 

#### Estágio 1: seleção do especificador de conversão

  * Os flags de formato de E/S são obtidos, como se por 

     fmtflags basefield = (str.flags() & [std::ios_base::basefield](<#/doc/io/ios_base/fmtflags>));
     fmtflags boolalpha = (str.flags() & [std::ios_base::boolalpha](<#/doc/io/ios_base/fmtflags>));

  * Se o tipo de `v` for um tipo inteiro, a primeira escolha aplicável das cinco seguintes é selecionada: 

     Se basefield == oct, usará o especificador de conversão %o
     Se basefield == hex, usará o especificador de conversão %X
     Se basefield == 0, usará o especificador de conversão %i
     Se o tipo de v for assinado, usará o especificador de conversão %d
     Se o tipo de v for não assinado, usará o especificador de conversão %u

  * Para tipos inteiros, o modificador de comprimento é adicionado à especificação de conversão, se necessário: `h` para `short` e `unsigned short`, `l` para `long` e `unsigned long`, `ll` para `long long` e `unsigned long long` (desde C++11)
  * Se o tipo de `v` for `float`, usará o especificador de conversão `%g`
  * Se o tipo de `v` for `double`, usará o especificador de conversão `%lg`
  * Se o tipo de `v` for `long double`, usará o especificador de conversão `%Lg`
  * Se o tipo de `v` for `void*`, usará o especificador de conversão `%p`
  * Se o tipo de `v` for `bool` e `boolalpha == 0`, prossegue como se o tipo de `v` fosse `long`, exceto pelo valor a ser armazenado em `v` no estágio 3. 
  * Se o tipo de `v` for `bool` e `boolalpha != 0`, o seguinte substitui os estágios 2 e 3: 
    * Caracteres sucessivos obtidos do iterator de entrada `in` são comparados com as sequências de caracteres obtidas de [std::use_facet](<#/doc/locale/use_facet>)<[std::numpunct](<#/doc/locale/numpunct>)<CharT>>(str.getloc()).falsename() e [std::use_facet](<#/doc/locale/use_facet>)<[std::numpunct](<#/doc/locale/numpunct>)<CharT>>(str.getloc()).truename() apenas o necessário para identificar a correspondência única. O iterator de entrada `in` é comparado a `end` apenas quando necessário para obter um caractere. 
    * Se a sequência alvo for correspondida de forma única, `v` é definido para o valor `bool` correspondente. Caso contrário, `false` é armazenado em `v` e [std::ios_base::failbit](<#/doc/io/ios_base/iostate>) é atribuído a `err`. Se uma correspondência única não pôde ser encontrada antes que a entrada terminasse (`in == end`), `err |= [std::ios_base::eofbit](<#/doc/io/ios_base/iostate>)` é executado. 

#### Estágio 2: extração de caracteres

  * Se `in == end`, o estágio 2 é encerrado imediatamente, nenhum caractere adicional é extraído. 
  * O próximo caractere é extraído de `in` como se por `char_type ct = *in;`: 
    * Se o caractere corresponder a um de `"0123456789abcdefxABCDEFX+-"` (até C++11) `"0123456789abcdefpxABCDEFPX+-"` (desde C++11), expandido para o `char_type` da locale como se por [std::use_facet](<#/doc/locale/use_facet>)<[std::ctype](<#/doc/locale/ctype>)<CharT>>(str.getloc()).widen(), ele é convertido para o `char` correspondente. 
    * Se o caractere corresponder ao separador de ponto decimal ([std::use_facet](<#/doc/locale/use_facet>)<[std::numpunct](<#/doc/locale/numpunct>)<CharT>>(str.getloc()).decimal_point())), ele é substituído por '.'. 
    * Se o caractere corresponder ao separador de milhares ([std::use_facet](<#/doc/locale/use_facet>)<[std::numpunct](<#/doc/locale/numpunct>)<CharT>>(str.getloc()).thousands_sep()) e a separação de milhares estiver em uso (conforme determinado por [std::use_facet](<#/doc/locale/use_facet>)<[std::numpunct](<#/doc/locale/numpunct>)<CharT>>(str.getloc()).grouping().length() != 0), então, se o ponto decimal '.' ainda não tiver sido acumulado, a posição do caractere é lembrada, mas o caractere é ignorado. Se o ponto decimal já tiver sido acumulado, o caractere é descartado e o estágio 2 é encerrado. 
    * Em qualquer caso, é feita uma verificação se o `char` obtido nas etapas anteriores é permitido no campo de entrada que seria analisado por [std::scanf](<#/doc/io/c/scanf>) dado o especificador de conversão selecionado no estágio 1. Se for permitido, ele é acumulado em um buffer temporário e o estágio 2 se repete. Se não for permitido, o estágio 2 é encerrado. 

#### Estágio 3: conversão e armazenamento

  * A sequência de `chars` acumulada no estágio 2 é convertida para um valor numérico: 

     A entrada é analisada de acordo com as regras de [std::scanf](<#/doc/io/c/scanf>). 
| (até C++11)  
  
     A entrada é analisada como se por 

  * [std::strtoll](<#/doc/string/byte/strtol>) para inteiro assinado `v`, 
  * [std::strtoull](<#/doc/string/byte/strtoul>) para inteiro não assinado `v`, 
  * [std::strtof](<#/doc/string/byte/strtof>) para `float v`, 
  * [std::strtod](<#/doc/string/byte/strtof>) para `double v`, ou 
  * [std::strtold](<#/doc/string/byte/strtof>) para `long double v`. 

| (desde C++11)  
  
  * Se a função de conversão falhar ao converter o campo inteiro, o valor ​`0`​ é armazenado em `v`. 
  * Se o tipo de `v` for um tipo inteiro assinado e a função de conversão resultar em um valor positivo ou negativo muito grande para caber nele, o valor representável mais positivo ou mais negativo é armazenado em `v`, respectivamente. 
  * Se o tipo de `v` for um tipo inteiro não assinado e a função de conversão resultar em um valor que não cabe nele, o valor representável mais positivo é armazenado em `v`. 
  * Em qualquer caso, se a função de conversão falhar, [std::ios_base::failbit](<#/doc/io/ios_base/iostate>) é atribuído a `err`. 
  * Caso contrário, o resultado numérico da conversão é armazenado em `v`. 
    * Se o tipo de `v` for `bool` e `boolalpha` não estiver definido, então se o valor a ser armazenado for ​`0`​, `false` é armazenado; se o valor a ser armazenado for `1`, `true` é armazenado; para qualquer outro valor, [std::ios_base::failbit](<#/doc/io/ios_base/iostate>) é atribuído a `err` e `true` é armazenado. 
  * Depois disso, o agrupamento de dígitos é verificado. Se a posição de qualquer um dos separadores de milhares descartados no estágio 2 não corresponder ao agrupamento fornecido por [std::use_facet](<#/doc/locale/use_facet>)<[std::numpunct](<#/doc/locale/numpunct>)&lt;CharT&gt;>(str.getloc()).grouping(), [std::ios_base::failbit](<#/doc/io/ios_base/iostate>) é atribuído a `err`. 
  * Se o estágio 2 foi encerrado pelo teste `in == end`, `err |= [std::ios_base::eofbit](<#/doc/io/ios_base/iostate>)` é executado para definir o bit `eof`. 

### Valor de retorno

`in`

### Notas

Antes das resoluções dos [LWG issue 23](<https://cplusplus.github.io/LWG/issue23>) e [LWG issue 696](<https://cplusplus.github.io/LWG/issue696>), `v` era deixado inalterado se ocorresse um erro. 

Antes da resolução do [LWG issue 221](<https://cplusplus.github.io/LWG/issue221>), strings representando inteiros hexadecimais (por exemplo, "0xA0") eram rejeitadas por `do_get(int)` mesmo sendo entrada válida para [`strtol`](<#/doc/string/byte/strtol>) porque o estágio 2 filtrava os caracteres 'X' e 'x'. 

Antes da resolução do [LWG issue 1169](<https://cplusplus.github.io/LWG/issue1169>), converter uma string de número negativo para um inteiro não assinado poderia produzir zero (já que o valor representado pela string é menor do que o tipo de destino pode representar). 

Antes da resolução do [LWG issue 2381](<https://cplusplus.github.io/LWG/issue2381>), strings representando números de ponto flutuante hexadecimais com expoentes (por exemplo, "0x1.23p-10") eram rejeitadas por `do_get(double)` mesmo sendo entrada válida para [strtod](<#/doc/string/byte/strtof>) porque o estágio 2 filtrava os caracteres 'P' e 'p'. As strings representando infinito ou não-número (por exemplo, "NaN" e "inf") são rejeitadas por `do_get(double)` mesmo sendo entrada válida para `strtod` porque o estágio 2 filtra caracteres como 'N' ou 'i'.  | (desde C++11)  
  
### Exemplo

Uma implementação de `operator>>` para um tipo definido pelo usuário.

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <locale>
    
    struct base { long x; };
    
    template<class CharT, class Traits>
    std::basic_istream<CharT, Traits>&
        operator >>(std::basic_istream<CharT, Traits>& is, base& b)
    {
        std::ios_base::iostate err = std::ios_base::goodbit;
    
        try // setting err could throw
        {
            typename std::basic_istream<CharT, Traits>::sentry s(is);
    
            if (s) // if stream is ready for input
                std::use_facet<std::num_get<CharT>>(is.getloc()).get(is, {}, is, err, b.x);
        }
        catch (std::ios_base::failure& error)
        {
            // handle the exception
        }
    
        return is;
    }
    
    int main()
    {
        base b;
        std::cin >> b;
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 17](<https://cplusplus.github.io/LWG/issue17>) | C++98  | o processo de análise de valores booleanos de texto estava incorreto  | corrigido   
[LWG 18](<https://cplusplus.github.io/LWG/issue18>) | C++98  | a sobrecarga de `get` que recebia `bool& value` estava faltando  | adicionado   
[LWG 23](<https://cplusplus.github.io/LWG/issue23>) | C++98  | entrada com overflow resultava em comportamento indefinido  | overflow tratado   
[LWG 154](<https://cplusplus.github.io/LWG/issue154>) | C++98  | o especificador de conversão para `double` era `%g` (o mesmo que `float`)  | alterado para `%lg`  
[LWG 221](<https://cplusplus.github.io/LWG/issue221>) | C++98  | `do_get` não analisava 'x' e 'X' enquanto [`strtol`](<#/doc/string/byte/strtol>) os analisava  | fez com que 'x' e 'X' fossem analisados   
[LWG 275](<https://cplusplus.github.io/LWG/issue275>) | C++98  | `get` tinha uma sobrecarga que recebia `short& value` em vez de `float&` | corrigido   
[LWG 358](<https://cplusplus.github.io/LWG/issue358>) | C++98  | separadores de milhares após o ponto decimal eram ignorados  | o estágio 2 é encerrado se encontrado   
[LWG 696](<https://cplusplus.github.io/LWG/issue696>) | C++98  | o resultado permanecia inalterado em caso de falha na conversão  | definido para zero   
[LWG 1169](<https://cplusplus.github.io/LWG/issue1169>) | C++98  | o tratamento de overflow era inconsistente entre tipos de ponto flutuante  | tornou consistente  
com `strtof`/`strtod`  
[LWG 2381](<https://cplusplus.github.io/LWG/issue2381>) | C++11  | `do_get` não analisava 'p' e 'P' enquanto [`strtod`](<#/doc/string/byte/strtof>) os analisava  | fez com que 'p' e 'P' fossem analisados   
  
### Veja também

[ operator>>](<#/doc/io/basic_istream/operator_gtgt>) |  extrai dados formatados   
(função membro pública de `std::basic_istream<CharT,Traits>`)  