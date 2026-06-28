# std::basic_regex&lt;CharT,Traits&gt;::assign

```cpp
basic_regex& assign( const basic_regex& other );  // (1) (desde C++11)
basic_regex& assign( basic_regex&& other ) noexcept;  // (2) (desde C++11)
basic_regex& assign( const CharT* s,
flag_type f = std::regex_constants::ECMAScript );  // (3) (desde C++11)
basic_regex& assign( const CharT* ptr, std::size_t count,
flag_type f = std::regex_constants::ECMAScript );  // (4) (desde C++11)
template< class ST, class SA >
basic_regex& assign( const std::basic_string<CharT,ST,SA>& str,
flag_type f = std::regex_constants::ECMAScript );  // (5) (desde C++11)
template< class InputIt >
basic_regex& assign( InputIt first, InputIt last,
flag_type f = std::regex_constants::ECMAScript );  // (6) (desde C++11)
basic_regex& assign( std::initializer_list<CharT> ilist,
flag_type f = std::regex_constants::ECMAScript );  // (7) (desde C++11)
```

Atribui o conteúdo à expressão regular.

1) Atribui o conteúdo de other. [flags()](<#/doc/regex/basic_regex/flags>) e [mark_count()](<#/doc/regex/basic_regex/mark_count>) são equivalentes aos valores de other.flags() e other.mark_count() após a chamada.

2) Atribui o conteúdo de other usando move semantics. [flags()](<#/doc/regex/basic_regex/flags>) e [mark_count()](<#/doc/regex/basic_regex/mark_count>) são equivalentes aos valores de other.flags() e other.mark_count() antes da atribuição. Após a chamada, other está em um estado válido, mas não especificado.

3-7) Atribui uma sequência de caracteres à expressão regular. As flags de sintaxe são definidas como `f`. [mark_count()](<#/doc/regex/basic_regex/mark_count>) retorna o número de subexpressões marcadas dentro da subexpressão resultante após a chamada.

3) Atribui uma string terminada em nulo apontada por s.

4) Atribui uma sequência de `count` caracteres, apontada por s.

5) Atribui a string str.

6) Atribui os caracteres no range `[`first`, `last`)`.

7) Atribui os caracteres na initializer list ilist.

### Parameters

- **other** — outra expressão regular para atribuir
- **s** — ponteiro para uma sequência de caracteres para atribuir
- **str** — string para atribuir
- **first, last** — o range de caracteres para atribuir
- **ilist** — initializer list contendo caracteres para atribuir
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

*this

### Exceções

1) Pode lançar exceções definidas pela implementação.

3-7) [std::regex_error](<#/doc/regex/regex_error>) se a expressão regular fornecida não for válida. O objeto não é modificado nesse caso.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Ver também

[ operator=](<#/>) | atribui o conteúdo
(função membro pública)