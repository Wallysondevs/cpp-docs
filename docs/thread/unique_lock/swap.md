# std::unique_lock&lt;Mutex&gt;::swap

```cpp
void swap( unique_lock& other ) noexcept;  // (desde C++11)
```

Troca os estados internos dos objetos de lock.

### Parâmetros

- **other** — o lock com o qual trocar o estado

### Valor de retorno

(nenhum)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <mutex>
    
    int main()
    {
        std::mutex mtx1;
        std::unique_lock<std::mutex> guard1(mtx1);
        std::unique_lock<std::mutex> guard2;
        guard2.swap(guard1);
    
        if (!guard1 && guard2)
            std::cout << "swapped success\n";
    
        return 0;
    }
```

Saída:
```
    swapped success
```

### Veja também

[ std::swap(std::unique_lock)](<#/doc/thread/unique_lock/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(function template)