# std::regex_iterator&lt;BidirIt,CharT,Traits&gt;::operator++, operator++(int)

```cpp
regex_iterator& operator++();  // (desde C++11)
regex_iterator operator++( int );  // (desde C++11)
```

  
Avança o iterator para a próxima correspondência. 

| Esta seção está incompleta  
Razão: explicar melhor   
  
Primeiramente, uma variável local do tipo `BidirIt` é construída com o valor de match[0].second. 

Se o iterator contiver uma correspondência de comprimento zero e start == end, *this é definido como um iterator de fim de sequência e a função retorna. 

Caso contrário, se o iterator contiver uma correspondência de comprimento zero, o operador invoca o seguinte: 

```cpp
regex_search(start, end, match, *pregex,
flags | regex_constants::match_not_null
regex_constants::match_continuous);
```

Se a chamada retornar true, a função retorna. 

Caso contrário, o operador incrementa `start` e continua como se a correspondência mais recente não fosse uma correspondência de comprimento zero. 

Se a correspondência mais recente não foi uma correspondência de comprimento zero, o operador define `flags` como flags | regex_constants::match_prev_avail e invoca o seguinte: 

regex_search(start, end, match, *pregex, flags);

Se a chamada retornar false, o iterator define *this como o iterator de fim de sequência, a função retorna. 

Em todos os casos em que a chamada para regex_search retorna true, match.prefix().first será igual ao valor anterior de match[0].second e para cada índice i no range `[`​0​`, `match.size()`)` para o qual match[i].matched é true, match[i].position() retornará distance(begin, match[i].first). 

Isso significa que match[i].position() fornece o offset desde o início da sequência alvo, o que frequentemente não é o mesmo que o offset da sequência passada na chamada para regex_search. 

É não especificado como a implementação faz esses ajustes. Isso significa que um compilador pode chamar uma função de busca específica da implementação, caso em que uma especialização de regex_search definida pelo usuário não será chamada. 

O comportamento é indefinido se o iterator for um iterator de fim de sequência. 

### Parâmetros

(nenhum) 

### Valor de retorno

1) *this

2) O valor anterior do iterator.