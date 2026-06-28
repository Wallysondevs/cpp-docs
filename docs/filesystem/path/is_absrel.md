```cpp
# std::filesystem::path::is_absolute,is_relative

bool is_absolute() const; |  (1)  |  (desde C++17)  
---|---|---  
bool is_relative() const; |  (2)  |  (desde C++17)  
| |   
  
Verifica se o caminho é absoluto ou relativo. Um caminho absoluto é um caminho que identifica de forma inequívoca a localização de um arquivo sem referência a um local de início adicional. A primeira versão retorna `true` se o caminho, em formato nativo, é absoluto, `false` caso contrário; a segunda versão faz o oposto.

### Parâmetros

(nenhum) 

### Valor de retorno

1) `true` se o caminho é absoluto, `false` caso contrário.

2) `false` se o caminho é absoluto, `true` caso contrário.

### Exceções

Pode lançar exceções definidas pela implementação. 

### Notas

O caminho "/" é absoluto em um sistema operacional POSIX, mas é relativo no Windows. 

### Veja também

 absolute(C++17) | compõe um caminho absoluto   
(function)  
---|---
```