# std::hash&lt;std::thread::id&gt;

Definido no cabeçalho `[<thread>](<#/doc/header/thread>)`

```c
template<> struct hash<std::thread::id>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para a classe [std::thread::id](<#/doc/thread/thread/id>) permite aos usuários obter hashes dos identificadores de threads.

### Exemplo

| Esta seção está incompleta
Razão: exemplo que usa hash de forma significativa

Execute este código
```
    #include <chrono>
    #include <iostream>
    #include <thread>
    #include <vector>
    using namespace std::chrono_literals;
    
    void foo()
    {
        std::this_thread::sleep_for(10ms);
    }
    
    int main()
    {
        std::vector<std::thread> v;
        for (int n = 0; n < 4; ++n)
            v.emplace_back(foo);
    
        std::hash<std::thread::id> hasher;
        for (auto& t : v)
        {
            std::cout << "thread " << t.get_id() << " hashes to "
                      << hasher(t.get_id()) << '\n';
            t.join();
        }
    }
```

Saída possível:
```
    thread 139786440144640 hashes to 8905351942358389397
    thread 139786431751936 hashes to 9222844670065909738
    thread 139786423359232 hashes to 18199000599186780501
    thread 139786414966528 hashes to 15386662774029264672
```

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(template de classe)