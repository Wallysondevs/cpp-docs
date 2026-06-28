# std::experimental::ostream_joiner&lt;DelimT,CharT,Traits&gt;::operator=

template< class T >  
ostream_joiner& operator=( const T& value ); |  (1)  |  (library fundamentals TS v2)  
---|---|---
ostream_joiner& operator=( const ostream_joiner& other ) = default; |  (2)  |  (library fundamentals TS v2)   
(declarado implicitamente)  
ostream_joiner& operator=( ostream_joiner&& other ) = default; |  (3)  |  (library fundamentals TS v2)   
(declarado implicitamente)  

  
1) Primeiro, se o flag privado de "primeiro elemento" for `false`, insere o delimitador `delim` no stream de saída `os` associado a este iterator como se por `os << delim;`.

Em seguida, define incondicionalmente o flag de "primeiro elemento" como `false`, e insere `value` no stream de saída como se por `os << value;`.

Seja `out_stream`, `delim` e `first_element` denotando o ponteiro de stream privado, o delimitador e os membros do flag de "primeiro elemento", respectivamente. Então esta função é equivalente a 
```cpp
    if (!first_element)
        *out_stream << delim;
    first_element = false;
    *out_stream << value;
    return *this;
```

2,3) Operador de atribuição de cópia/movimentação declarado implicitamente que atribui por cópia/movimentação o ponteiro de stream privado, o delimitador e os membros do flag de "primeiro elemento".

### Parâmetros

value  |  \-  |  o objeto a ser escrito no stream   
---|---|---
other  |  \-  |  o objeto `ostream_joiner` a ser atribuído a este objeto   
  
### Valor de retorno

`*this`. 

### Exemplo

Execute este código
```cpp 
    #include <experimental/iterator>
    #include <iostream>
     
    int main()
    {
        auto joiner = std::experimental::make_ostream_joiner(std::cout, ", ");
        joiner = "First";
        joiner = "do no harm.";  // prefixa com o delimitador
    }
```

Saída: 
```
    First, do no harm.
```