# std::regex_traits&lt;CharT&gt;::transform_primary

template< class ForwardIt >  
string_type transform_primary( ForwardIt first, ForwardIt last ) const;

  
Para a sequência de caracteres `[`first`, `last`)`, obtém a chave de ordenação primária na ordem de agrupamento do locale imbuído, isto é, a chave de ordenação que é baseada nas posições das letras e unidades de agrupamento no alfabeto nacional, ignorando maiúsculas/minúsculas, diacríticos, variantes, etc. Se uma chave de ordenação primária for menor que outra chave de ordenação primária com operator<, então a sequência de caracteres que produziu a primeira chave de ordenação vem antes da sequência de caracteres que produziu a segunda chave de ordenação, na ordem de agrupamento primária do locale atualmente imbuído. 

A biblioteca regex usa esta trait para comparar caracteres com classes de equivalência. Por exemplo, a regex [[=a=]] é equivalente ao caractere `c1` se traits.transform_primary(c1) for equivalente a traits.transform_primary("a") (o que é verdade para qualquer `c1` de "AÀÁÂÃÄÅaàáâãäå" no locale U.S. English). Note que `transform_primary()` aceita um argumento de sequência de caracteres porque classes de equivalência podem ser multicaracteres, como [[=ch=]] em Czech ou [[=dzs=]] em Hungarian. 

Não há uma maneira portátil de definir a chave de ordenação primária em termos de [std::locale](<#/doc/locale/locale>) já que a conversão da chave de agrupamento retornada por std::collate::transform() para a chave de equivalência primária é específica do locale, e se o usuário substituir o facet [std::collate](<#/doc/locale/collate>), essa conversão não é mais conhecida pela [std::regex_traits](<#/doc/regex/regex_traits>) da standard library. Especializações da standard library de [std::regex_traits](<#/doc/regex/regex_traits>) retornam uma string vazia a menos que o facet [std::collate](<#/doc/locale/collate>) do locale atualmente imbuído não tenha sido substituído pelo usuário, e ainda corresponda ao facet [std::collate](<#/doc/locale/collate>) fornecido pelo sistema), nesse caso, [std::collate_byname](<#/doc/locale/collate_byname>)&lt;CharT&gt;::transform(first, last) é executado e a chave de ordenação que ele produz é convertida para a chave de ordenação primária esperada usando uma conversão específica do locale. 

### Parâmetros

first, last  |  \-  |  um par de iteradores que determina a sequência de caracteres a comparar   
Requisitos de tipo   
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).   
  
### Valor de retorno

A chave de ordenação primária para a sequência de caracteres `[`first`, `last`)` no locale atualmente imbuído, ignorando maiúsculas/minúsculas, variantes, diacríticos, etc. 

### Exemplo

Demonstra o recurso de regex que funciona através de `transform_primary()`.

Execute este código
```
    #include <iostream>
    #include <regex>
     
    int main()
    {
        std::locale::global(std::locale("en_US.UTF-8"));
        std::wstring str = L"AÀÁÂÃÄÅaàáâãäå";
        std::wregex re(L"[[=a=]]*", std::regex::basic);
        std::cout << std::boolalpha << std::regex_match(str, re) << '\n';
    }
```

Saída possível: 
```
    true
```

| Esta seção está incompleta  
Razão: poderia usar um exemplo com regex_traits definido pelo usuário fornecendo transform_primary definido pelo usuário   