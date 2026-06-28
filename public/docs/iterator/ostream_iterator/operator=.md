# std::ostream_iterator&lt;T,CharT,Traits&gt;::operator=

```cpp
ostream_iterator& operator=( const ostream_iterator& );  // (1)
ostream_iterator& operator=( const T& value );  // (2)
```

  
1) Operador de atribuição de cópia. Atribui o conteúdo de `other`.

2) Insere `value` no stream associado, em seguida, insere o delimitador, se um foi especificado no momento da construção.

Se `out_stream` é um ponteiro para o [std::basic_ostream](<#/doc/io/basic_ostream>) associado e `delim` é o delimitador especificado na construção deste objeto, então o efeito é equivalente a 

*out_stream << value;  
if (delim != 0)  
*out_stream << delim;  
return *this;

### Parâmetros

value  |  \-  |  o objeto a ser inserido   
  
### Valor de retorno

*this

### Notas

`T` pode ser qualquer classe com um `operator<<` definido pelo usuário. 

Antes de C++20, a existência do operador de atribuição de cópia dependia da [geração implícita depreciada](<#/doc/language/as_operator>). 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <iterator>
     
    int main()
    {
        std::ostream_iterator<int> i1(std::cout, ", ");
        *i1++ = 1; // forma usual, usada por algoritmos padrão
        *++i1 = 2;
        i1 = 3; // nem * nem ++ são necessários
        std::ostream_iterator<double> i2(std::cout);
        i2 = 3.14;
        std::cout << '\n';
    }
```

Saída: 
```
    1, 2, 3, 3.14
```