# std::swap(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
void swap( std::valarray<T>& lhs, std::valarray<T>& rhs ) noexcept;
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::valarray](<#/doc/numeric/valarray>). Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — valarrays cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <valarray>
    
    void print(auto rem, const std::valarray<int>& v)
    {
        std::cout << rem << '{';
        for (char sep[]{0, ' ', 0}; auto elem : v)
            std::cout << sep << elem, *sep = ',';
        std::cout << "}\n";
    }
    
    int main()
    {
        std::valarray x{3, 1, 4, 1, 5};
        std::valarray y{2, 7, 1, 8};
    
        print("Before swap:\n" "x: ", x);
        print("y: ", y);
    
        std::swap(x, y);
    
        print("After swap:\n" "x: ", x);
        print("y: ", y);
    }
```

Saída:
```
    Before swap:
    x: {3, 1, 4, 1, 5}
    y: {2, 7, 1, 8}
    After swap:
    x: {2, 7, 1, 8}
    y: {3, 1, 4, 1, 5}
```

### Veja também

[ swap](<#/doc/numeric/valarray/swap>) | troca com outro valarray
(função membro pública)