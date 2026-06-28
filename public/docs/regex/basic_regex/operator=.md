# std::basic_regex&lt;CharT,Traits&gt;::operator=

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
basic_regex& operator=( const basic_regex& other );
basic_regex& operator=( basic_regex&& other ) noexcept;
basic_regex& operator=( const CharT* ptr );
basic_regex& operator=( std::initializer_list<CharT> il );
template< class ST, class SA >
basic_regex& operator=( const std::basic_string<CharT,ST,SA>& p );
```

  
Atribui o conteúdo.

1) Operador de atribuição de cópia. Atribui o conteúdo de other. Equivalente a assign(other);.

2) Operador de atribuição de movimento. Atribui o conteúdo de other usando move semantics. other fica em um estado válido, mas não especificado após a operação. Equivalente a assign(other);.

3) Atribui uma string de caracteres terminada em nulo apontada por ptr. Equivalente a assign(ptr);.

4) Atribui caracteres contidos na initializer list il. Equivalente a assign(il);.

5) Atribui o conteúdo da string p. Equivalente a assign(p);.

### Parâmetros

other  |  \-  |  outro objeto regex   
---|---|---
ptr  |  \-  |  ponteiro para uma string de caracteres terminada em nulo   
il  |  \-  |  initializer list contendo caracteres a serem atribuídos   
p  |  \-  |  string contendo caracteres a serem atribuídos   
  
### Valor de retorno

*this

### Exceções

1) Pode lançar exceções definidas pela implementação.

3-5) [std::regex_error](<#/doc/regex/regex_error>) se a expressão regular fornecida não for válida. O objeto não é modificado nesse caso.

### Ver também

[ assign](<#/doc/regex/basic_regex/assign>) |  atribui o conteúdo   
(função membro pública)  