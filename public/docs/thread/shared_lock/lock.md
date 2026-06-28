# std::shared_lock&lt;Mutex&gt;::lock

```cpp
void lock();  // (desde C++14)
```

  
Bloqueia o mutex associado em modo compartilhado. Efetivamente chama mutex()->lock_shared(). 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Exceções

  * Quaisquer exceções lançadas por mutex()->lock_shared(). 

  * Se não houver mutex associado, [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::operation_not_permitted](<#/doc/error/errc>). 

  * Se o mutex associado já estiver bloqueado por este `shared_lock` (ou seja, [owns_lock](<#/doc/thread/shared_lock/owns_lock>) retornar true), [std::system_error](<#/doc/error/system_error>) com um código de erro de [std::errc::resource_deadlock_would_occur](<#/doc/error/errc>). 

### Exemplo

| Esta seção está incompleta  
Razão: mostrar um uso significativo de shared_lock::lock   
  
Execute este código
```
    #include <iostream>
    #include <mutex>
    #include <shared_mutex>
    #include <string>
    #include <thread>
     
    std::string file = "Original content."; // Simulates a file
    std::mutex output_mutex; // mutex that protects output operations.
    std::shared_mutex file_mutex; // reader/writer mutex
     
    void read_content(int id)
    {
        std::string content;
        {
            std::shared_lock lock(file_mutex, std::defer_lock); // Do not lock it first.
            lock.lock(); // Lock it here.
            content = file;
        }
        std::lock_guard lock(output_mutex);
        std::cout << "Contents read by reader #" << id << ": " << content << '\n';
    }
     
    void write_content()
    {
        {
            std::lock_guard file_lock(file_mutex);
            file = "New content";
        }
        std::lock_guard output_lock(output_mutex);
        std::cout << "New content saved.\n";
    }
     
    int main()
    {
        std::cout << "Two readers reading from file.\n"
                  << "A writer competes with them.\n";
        std::thread reader1{read_content, 1};
        std::thread reader2{read_content, 2};
        std::thread writer{write_content};
        reader1.join();
        reader2.join();
        writer.join();
        std::cout << "The first few operations to file are done.\n";
        reader1 = std::thread{read_content, 3};
        reader1.join();
    }
```

Saída possível: 
```
    Two readers reading from file.
    A writer competes with them.
    Contents read by reader #1: Original content.
    Contents read by reader #2: Original content.
    New content saved.
    The first few operations to file are done.
    Contents read by reader #3: New content
```

### Veja também

[ try_lock](<#/doc/thread/shared_lock/try_lock>) |  tenta bloquear o mutex associado   
(função membro pública)  
[ unlock](<#/doc/thread/shared_lock/unlock>) |  desbloqueia o mutex associado   
(função membro pública)