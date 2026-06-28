# operator&lt;&lt;(std::basic_string_view)

Definido no cabeçalho `[<string_view>](<#/doc/header/string_view>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
std::basic_string_view<CharT, Traits> v );
```

Comporta-se como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>). Após construir e verificar o objeto sentinela, [determina o preenchimento do formato de saída](<#/doc/named_req/FormattedOutputFunction>).

Em seguida, armazena cada caractere da sequência resultante seq (o conteúdo de v com preenchimento) no stream de saída os como se chamasse os.rdbuf()->sputn(seq, n), onde n é [std::max](<#/doc/algorithm/max>)(os.width(), str.size()).

Finalmente, chama os.width(0) para cancelar os efeitos de [std::setw](<#/doc/io/manip/setw>), se houver.

### Exceções

Pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>) se uma exceção for lançada durante a saída.

### Parâmetros

- **os** — um stream de saída de caracteres
- **v** — a view a ser inserida

### Valor de retorno

os

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <string_view>
    
    int main()
    {
        constexpr std::string_view s{"abc"};
        constexpr int width{5};
    
        // fill/left/right properties are kept until changed
        std::cout << std::setfill('-');
        std::cout << std::left;
    
        std::cout << '' << [std::setw(width) << s << "]\n";
        std::cout << '' << [std::setw(width) << s << "]\n";
    
        std::cout << std::right;
        std::cout << '' << [std::setw(width) << s << "]\n";
    
        // width is reset after each call
        std::cout << '[' << s << "]\n";
    }
```

Saída:
```
    [abc--]
    [abc--]
    [--abc]
    [abc]
```

### Veja também

[ operator<&lt;operator&gt;>](<#/doc/string/basic_string/operator_ltltgtgt>) | realiza entrada e saída de stream em strings
(modelo de função)