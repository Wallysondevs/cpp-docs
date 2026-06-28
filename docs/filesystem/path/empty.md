# std::filesystem::path::empty

```cpp
bool empty() const noexcept;  // (desde C++17)
```

  
Verifica se o path no formato genérico está vazio. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se o path estiver vazio, false caso contrário. 

### Notas

Um path vazio pode ser obtido chamando [`clear`](<#/doc/filesystem/path/clear>) e por construção padrão de um `path`. Também pode ser retornado por uma função de decomposição de path (como [`extension`](<#/doc/filesystem/path/extension>)) se o componente correspondente não estiver presente no path. 

Um path vazio é classificado como um path relativo. 

### Veja também

[ (constructor)](<#/doc/filesystem/path/path>) |  constrói um `path`   
(função membro pública)  