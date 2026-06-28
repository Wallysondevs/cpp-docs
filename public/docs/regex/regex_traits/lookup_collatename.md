# std::regex_traits&lt;CharT&gt;::lookup_collatename

template< class ForwardIt >  
string_type lookup_collatename( ForwardIt first, ForwardIt last ) const;

  
Se a sequência de caracteres `[`first`, `last`)` representa o nome de um elemento de ordenação válido na locale atualmente imbuída, retorna o nome desse elemento de ordenação. Caso contrário, retorna uma string vazia. 

Elementos de ordenação são os símbolos encontrados em expressões regulares POSIX entre `[.` e `.]`. Por exemplo, `[.a.]` corresponde ao caractere `a` na locale C. `[.tilde.]` corresponde ao caractere `~` na locale C também. `[.ch.]` corresponde ao dígrafo `ch` na locale Tcheca, mas gera [std::regex_error](<#/doc/regex/regex_error>) com o código de erro [std::regex_constants::error_collate](<#/doc/regex/error_type>) na maioria das outras locales. 

### Parâmetros

first, last  |  \-  |  um par de iterators que determina a sequência de caracteres que representa um nome de elemento de ordenação   
Requisitos de tipo   
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).   
  
### Valor de retorno

A representação do elemento de ordenação nomeado como uma string de caracteres. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <regex>
    #include <string>
     
    struct noisy_traits : std::regex_traits<char>
    {
        template<class Iter>
        string_type lookup_collatename(Iter first, Iter last) const
        {
            string_type result = regex_traits::lookup_collatename(first, last);
            std::cout << "regex_traits<>::lookup_collatename(\""
                      << string_type(first, last)
                      << "\") returns \"" << result << "\"\n";
            return result;
        }
    };
     
    int main()
    {
        std::string str = "z|}a"; // C locale collation order: x,y,z,{,|,},~
        std::basic_regex<char, noisy_traits> re("[x-[.tilde.]]*a", std::regex::basic);
        std::cout << std::boolalpha << std::regex_match(str, re) << '\n';
    }
```

Saída possível: 
```
    regex_traits<>::lookup_collatename("tilde") returns "~"
    true
```