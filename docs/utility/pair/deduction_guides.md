# Guias de dedução para std::pair

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template<class T1, class T2>
pair(T1, T2) -> pair<T1, T2>;
```

Um [guia de dedução](<#/doc/language/ctad>) é fornecido para [std::pair](<#/doc/utility/pair>) para lidar com os casos de borda não cobertos pelos guias de dedução implícitos, em particular, argumentos não copiáveis e conversão de array para ponteiro.

### Exemplo

Execute este código
```
    #include <utility>
    
    int main()
    {
        int a[2], b[3];
        std::pair p{a, b}; // guia de dedução explícito é usado neste caso
    }
```