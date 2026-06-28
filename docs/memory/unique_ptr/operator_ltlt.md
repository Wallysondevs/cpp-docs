# std::unique_ptr&lt;T,Deleter&gt;::operator&lt;&lt;

```cpp
template< class CharT, class Traits, class Y, class D >
std::basic_ostream<CharT, Traits>& operator<<( std::basic_ostream<CharT, Traits>& os,
const std::unique_ptr<Y, D>& p );  // (desde C++20)
```

  
Insere o valor do ponteiro gerenciado por p no stream de saída os. 

Equivalente a os << p.get(). 

Esta sobrecarga participa da resolução de sobrecarga somente se os << p.get() for uma expressão válida. 

### Parâmetros

os  |  \-  |  um [std::basic_ostream](<#/doc/io/basic_ostream>) para inserir p   
---|---|---
p  |  \-  |  o ponteiro a ser inserido em os  
  
### Valor de retorno

os

### Notas

Se [std::unique_ptr](<#/doc/memory/unique_ptr>)<Y, D>::pointer for um ponteiro para um tipo de caractere (por exemplo, quando `Y` é char([]) ou CharT([])), isso pode acabar chamando as [sobrecargas de `operator<<` para strings de caracteres terminadas em nulo](<#/doc/io/basic_ostream/operator_ltlt2>) (causando comportamento indefinido se o ponteiro não apontar de fato para tal string), em vez da [sobrecarga para imprimir o valor do próprio ponteiro](<#/doc/io/basic_ostream/operator_ltlt>). 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <memory>
     
    class Foo {};
     
    int main()
    {
        auto p = std::make_unique<Foo>();
        std::cout << p << '\n';
        std::cout << p.get() << '\n';
    }
```

Saída possível: 
```
    0x6d9028
    0x6d9028
```

### Veja também

[ get](<#/doc/memory/unique_ptr/get>) |  retorna um ponteiro para o objeto gerenciado   
(função membro pública)  