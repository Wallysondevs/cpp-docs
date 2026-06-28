# std::regex_token_iterator&lt;BidirIt,CharT,Traits&gt;::regex_token_iterator

```cpp
regex_token_iterator();  // (1) (desde C++11)
regex_token_iterator( BidirIt a, BidirIt b,
const regex_type& re,
int submatch = 0,
std::regex_constants::match_flag_type m =
std::regex_constants::match_default );  // (2) (desde C++11)
regex_token_iterator( BidirIt a, BidirIt b,
const regex_type& re,
const std::vector<int>& submatches,
std::regex_constants::match_flag_type m =
std::regex_constants::match_default );  // (3) (desde C++11)
regex_token_iterator( BidirIt a, BidirIt b,
const regex_type& re,
std::initializer_list<int> submatches,
std::regex_constants::match_flag_type m =
std::regex_constants::match_default );  // (4) (desde C++11)
template< std::size_t N >
regex_token_iterator( BidirIt a, BidirIt b,
const regex_type& re,
const int (&submatches)[N],
std::regex_constants::match_flag_type m =
std::regex_constants::match_default );  // (5) (desde C++11)
regex_token_iterator( const regex_token_iterator& other );  // (6) (desde C++11)
regex_token_iterator( BidirIt a, BidirIt b,
const regex_type&& re,
int submatch = 0,
std::regex_constants::match_flag_type m =
std::regex_constants::match_default ) = delete;  // (7) (desde C++11)
regex_token_iterator( BidirIt a, BidirIt b,
const regex_type&& re,
const std::vector<int>& submatches,
std::regex_constants::match_flag_type m =
std::regex_constants::match_default ) = delete;  // (8) (desde C++11)
regex_token_iterator( BidirIt a, BidirIt b,
const regex_type&& re,
std::initializer_list<int> submatches,
std::regex_constants::match_flag_type m =
std::regex_constants::match_default ) = delete;  // (9) (desde C++11)
template< std::size_t N >
regex_token_iterator( BidirIt a, BidirIt b,
const regex_type&& re,
const int (&submatches)[N],
std::regex_constants::match_flag_type m =
std::regex_constants::match_default ) = delete;  // (10) (desde C++11)
```

  
Constrói um novo `regex_token_iterator`: 

1) Construtor padrão. Constrói o iterador de fim de sequência.

2-5) Primeiro, copia a lista do submatch solicitado do argumento `submatches` ou `submatch` para a lista membro armazenada no iterador e constrói o [std::regex_iterator](<#/doc/regex/regex_iterator>) membro passando a, b, re e m para seu construtor de quatro argumentos (esse construtor realiza a chamada inicial para [std::regex_search](<#/doc/regex/regex_search>)) e define o contador interno de submatches como zero. 

  * Se, após a construção, o `regex_iterator` membro não for um iterador de fim de sequência, define o ponteiro membro para o endereço do [std::sub_match](<#/doc/regex/sub_match>) atual. 
  * Caso contrário (se o `regex_iterator` membro for um iterador de fim de sequência), mas o valor -1 for um dos valores em `submatches`/`submatch`, transforma *this em um _iterador de sufixo_ apontando para o range `[`a`, `b`)` (a string inteira é o sufixo não correspondido). 
  * Caso contrário (se -1 não estiver na lista de `submatches`), transforma *this no iterador de fim de sequência.

O comportamento é indefinido se qualquer valor em `submatches` for menor que -1. 

6) Construtor de cópia: realiza cópia membro a membro (incluindo a criação de uma cópia do `regex_iterator` membro e do ponteiro membro para o `sub_match` atual).

7-10) As sobrecargas (2-5) são proibidas de serem chamadas com uma regex temporária, pois, caso contrário, o iterador retornado seria imediatamente invalidado.

### Parâmetros

a  |  \-  |  [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) para o início da sequência de caracteres alvo   
---|---|---
b  |  \-  |  [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) para o fim da sequência de caracteres alvo   
re  |  \-  |  expressão regular usada para buscar na sequência de caracteres alvo   
submatch  |  \-  |  o índice do submatch que deve ser retornado. "0" representa a correspondência inteira, e "-1" representa as partes que não foram correspondidas (por exemplo, o conteúdo entre as correspondências)   
submatches  |  \-  |  a sequência de índices de submatch que devem ser iterados dentro de cada correspondência, podendo incluir o valor especial -1 para os fragmentos não correspondidos   
m  |  \-  |  flags que governam o comportamento de re  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 2332](<https://cplusplus.github.io/LWG/issue2332>) | C++11  | um `regex_token_iterator` construído a partir de uma  
`basic_regex` temporária tornava-se inválido imediatamente  | tal construção é proibida via sobrecargas deletadas 